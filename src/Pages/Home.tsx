import { useState } from "react";
import styled from "styled-components";
import { FunctionDeclaration } from "typescript";

type Provider = {
    id: number,
    name: string,
    removeAssignment: (id: number) =>  void
}

const Assignment: React.FC<Provider> = ({ name, id, removeAssignment}) => {

    return (
        <>
            <BoxAssignment>
                <p>{ name }</p>
                <span onClick={() => removeAssignment(id)}>x</span>
            </BoxAssignment>
        </>
    )
}


const Home: React.FC = () => {
    
    type AssignmentType = {
        id: number,
        name: string,
    };
    type AssignmentData = AssignmentType[];
    const [data, setData] = useState<AssignmentData>([]);
    const [id, setId] = useState(0);
    const [assignment, setAssignment] = useState({id, name: ""});
    
    function sendData(event: any) {
        event?.preventDefault();
        setData([... data, assignment]);
        setId(id + 1);
        setAssignment({id: 0, name: ""});
    }

    function removeAssignment(id: number) {
        data.forEach((value, index) => {
            if (value.id === id) {
                data.splice(index, 1);
            }
        })
        setData([...data])
    }


    return (
        <Container>
            <BoxInput>
                <form onSubmit={sendData}>
                    <input type = "text" placeholder = "O que deseja fazer?" value = {assignment.name} 
                    onChange = {event => setAssignment({name: event.target.value, id: id})}/>
                    <button type = "submit">Enviar</button>
                </form>
            </BoxInput>
            <List>
                {data.map((value, index) => <Assignment key = {index} name = {value.name} id = {value.id} removeAssignment = {removeAssignment}/>)}
            </List>
        </Container>
    )
}
export default Home;

const Container = styled.div`
    width: 500px;
    height: 640px;
    background-color: skyblue;
    opacity: 0.4;
    margin: 100px auto;
    border-radius: 10px;
`

const BoxInput = styled.div`
    padding: 10px;
    text-align: center;

    && input {
        width: 400px;
        height: 40px;
        border-radius: 5px;
        outline: none;
        border: none;
        padding-left: 10px;
        font-size: 16px;
        font-family: Arial, Helvetica, sans-serif;
        color: black;
    }

    && button {
        height: 30px;
        width: 100px;
        border-radius: 5px;
        border: none;
        margin-top: 10px;
        cursor: pointer;
    }
`

const List = styled.div`
    margin: 10px auto;
    width: 80%;
    height: 80%;
`

const BoxAssignment = styled.div`
    background-color: white;
    margin: 6px auto;
    border-radius: 5px;
    width: 98%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    && p {
        font-size: 18px;
        font-family: Arial, Helvetica, sans-serif;
        color: black;
        padding: 10px;
    }

    && span {
        padding-left: 2px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #b4b2b2;
        width: 20px;
        height: 20px;
        opacity: #b4b2b2;
        border-radius: 50%;
        margin-right: 10px;
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
`