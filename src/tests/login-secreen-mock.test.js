import React from "react";
import axios from "axios";
import { findAllUsers, BASE_URL } from "./services";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Tuiter } from "../components/tuiter";

jest.mock("axios");


describe('www', () => {
    beforeEach(() => {
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { users: MOCKED_USERS } }));

        act(() => {
            render(<Tuiter />)
        });
    });


    test("login renders users", async () => {
        // console.log(qwe);
        axios.get.mockImplementation(() =>
            Promise.resolve({ data: { users: MOCKED_USERS } }));

        await act(async () => {
            // get all the links
            // const a = document.querySelectorAll("a#Login");
            const a = await screen.getByText(/Login/i);
            // console.log(a);
            // click on the nth link
            fireEvent.click(a);
        })

        await waitFor(() => {
            // const regex = new RegExp(link.expect.textOnScreen, "i");
            const linkElement = screen.getByText(/bob/i);
            expect(linkElement).toBeInTheDocument();
        });


        // act(() => {
        //   const loginLink = screen.getByText(/Login/i);
        //   console.log(loginLink)
        //   // // get all the links
        //   // const a = document.querySelectorAll("a");
        //   // // click on the nth link
        //   // fireEvent.click(a[nth]);
        // })

        // ;
        // await waitFor(() => {
        //   const linkElement = screen.getByText(/ellenripley/i);
        //   expect(linkElement).toBeInTheDocument();
        // });

        // expect(await screen.getByText(/ellen_ripley/i)).toBeInTheDocument();

        // const {container} = render(
        //   <HashRouter>
        //     <Login/>
        //   </HashRouter>
        // );


        // act(() => {
        //   render(
        //     <HashRouter>
        //       <Login/>
        //     </HashRouter>
        //   )
        // });
        //
        // const a = document.querySelectorAll("a");
        //
        //   console.log(a);

        // await waitFor(async () => {
        //   await screen.getByText(/ellen_ripley/i);
        //   expect(user).toBeInTheDocument();
        // }, {timeout: 5000});

        // screen.getByText(/ellen_ripley/i)
        //   .then(ddd => {
        //     console.log(ddd)
        //     // expect(user).toBeInTheDocument();
        //   })
    });
});
