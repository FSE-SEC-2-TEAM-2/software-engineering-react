import axios from 'axios';
import * as services from "./services";
import {MyDislikes} from "../components/profile/my-dislikes";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import React from "react";
import {Login} from "../components/profile/login";

const MOCKED_TUITS = [
    {tuit: "alice's tuit", postedBy: {username: "Alice", email: "alice@wonderland.com"}, _id: "1234"},
    {tuit: "bob's tuit", postedBy: {username: "Bob", email: "bob@builders.inc"}, _id: "1235"},
    {tuit: "charlie's tuit", postedBy: {username: "Carlie", email: "charile@chocolate.com"}, _id: "1236"},
];

describe('Test mock works', () => {
    const mock = jest.spyOn(axios, 'get');

    afterEach(() => {
        mock.mockRestore();
    })

    test("mocked hello world axios works", async () => {
        mock.mockImplementation(() =>
            Promise.resolve({data: {message: 'hello world'}}));
        const response = await axios.get();
        expect(response.data.message).toEqual('hello world')
    });
})

describe('Test tuit mock', () => {
    const mock = jest.spyOn(axios, 'get');

    afterEach(() => {
        mock.mockRestore();
    })

    test("mocked tuits works", async () => {
        mock.mockImplementation(() => {
            console.log("Sending mocked!")
            return Promise.resolve({data: {tuits: MOCKED_TUITS}})
        });
        act(() => {
            render(
                <MyDislikes/>
            );
        });

        const tuit = screen.getByText(/alice's tuit/i);
        expect(tuit).toBeInTheDocument();
    });
})
