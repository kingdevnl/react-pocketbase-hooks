import {useContext, useEffect, useState} from "react";
import {ClientContext} from "../../context/client";
import Record from "../../record";


export default function useRecord<T extends Record>(collection: string, id: string, expand: string = "", realtime: boolean = true): [T, boolean, Error?] {
    const client = useContext(ClientContext);

    if (!client) {
        throw new Error("useRecords must be used within a <ClientProvider>");
    }

    const [record, setRecord] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async () => {
            const record = await client.records.getOne(collection, id, {expand});
            setRecord(record as any);
            setLoading(false);

            if (realtime) {
                await client.realtime.subscribe(collection + "/" + id, (event) => {
                    switch (event.action) {
                        case "update":
                            setRecord(event.record as any);
                            break;
                        case "delete":
                            setRecord(null);
                            break
                    }
                });
            }

        })().catch((err) => setError(err));
    }, []);


    return [record, loading, error];

}
