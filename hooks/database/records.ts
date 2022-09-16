import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../../context/client";
import Record from "../../record";

export function useRecords<T extends Record>(collection: string, filter: string = "", sort: string = "", expand: string = "", realtime: boolean = true, batchSize: number = 200): [T[], boolean, Error?] {
    const client = useContext(ClientContext);

    if (!client) {
        throw new Error("useRecords must be used within a <ClientProvider>");
    }

    const [records, setRecords] = useState<T []>([]);
    const [error, setError] = useState<Error | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const records = await client.records.getFullList(collection, batchSize, {filter, sort, expand});
            setRecords(records as any[]);
            setLoading(false);

            if (realtime) {
                await client.realtime.subscribe(collection, (event) => {
                    setRecords((records: any[]) => {
                        const index = records.findIndex(
                            (element) => element.id === event.record.id
                        );

                        switch (event.action) {
                            case "create":
                                return [...records, event.record];

                            case "update":
                                if (index >= 0) records[index] = event.record;
                                console.log("Updated record", event)
                                return [...records];

                            case "delete":
                                if (index >= 0) records.splice(index, 1);
                                return [...records];
                        }

                        return records;
                    });
                });
            }

        })().catch((err) => setError(err));

    }, []);


    return [records, loading, error];
}
