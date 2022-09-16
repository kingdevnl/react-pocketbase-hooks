import './App.css'
import {useRecords} from "../../hooks/database/records";
import Record from "../../record";
import {
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import useRecord from "../../hooks/database/record";

interface Post extends Record {
    title: string;
    content: string;
}

function App() {

    const [posts, loading, error] = useRecords<Post>("posts");

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <Container>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Content</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map(post => (
                            <TableRow key={post.id}>
                                <TableCell component="th" scope="row">
                                    {post.id}
                                </TableCell>
                                <TableCell align="right">{post.title}</TableCell>
                                <TableCell align="right">{post.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default App
