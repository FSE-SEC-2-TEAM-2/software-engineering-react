import { Tuits } from "../components/tuits";
import { screen, render } from "@testing-library/react";
import * as services from "./services"
import axios from "axios";
import { HashRouter } from "react-router-dom";
import * as service from "../services/tuits-service";

const MOCKED_TUITS = [
    { tuit: "alice's tuit", postedBy: { username: "Alice", email: "alice@wonderland.com" }, _id: "1234" },
    { tuit: "bob's tuit", postedBy: { username: "Bob", email: "bob@builders.inc" }, _id: "1235" },
    { tuit: "charlie's tuit", postedBy: { username: "Carlie", email: "charile@chocolate.com" }, _id: "1236" },
];

describe('render from static', () => {
    test('tuit list renders static tuit array', () => {
        const deleteTuit = (tid) =>
            service.deleteTuit(tid)
                .then();

        render(
            <HashRouter>
                <Tuits tuits={MOCKED_TUITS} deleteTuit={deleteTuit} />
            </HashRouter>);

        const expectations = [/alice's tuit/i, /bob's tuit/i, /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i];

        expectations.forEach((expectation) => {
            let linkElements = screen.getAllByText(expectation);

            linkElements.forEach((element) => {
                expect(element).toBeInTheDocument();
            });
        });
    });
});

describe('render from async', () => {
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const sampleTuit = {
        tuit: 'Test Tuit 1',
    };

    let tids = [];
    let tuits = [];
    let newUser;

    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        newUser = await services.createUser(adam);

        for (let tuitCount = 0; tuitCount < 5; tuitCount++) {
            const tuit = `Test Tuit ${tuitCount + 1}`;
            sampleTuit.tuit = tuit;
            sampleTuit.postedBy = newUser._id;

            let newTuit = await services.createTuit(newUser._id, sampleTuit);

            tids.push(newTuit._id);
            tuits.push(tuit);
        }

        return tids;
    });

    afterAll(() => {
        let promises = [];

        tids.forEach((tid) => {
            promises.push(services.deleteTuit(tid));
        });
        promises.push(services.deleteUsersByUsername(adam.username));

        return Promise.all(promises);
    });

    test('tuit list renders async', async () => {
        const allTuits = await services.findAllTuits();
        const user = await services.findUserByUsername(adam.username);

        const createdTuits = allTuits.filter(
            (tuit) => tids.indexOf(tuit._id) >= 0);

        const deleteTuit = (tid) =>
            service.deleteTuit(tid)
                .then();

        render(
            <HashRouter>
                <Tuits tuits={createdTuits} deleteTuit={deleteTuit} />
            </HashRouter>);

        tuits.forEach((tuit) => {
            let linkElements = screen.getAllByText(tuit);

            linkElements.forEach((element) => {
                expect(element).toBeInTheDocument();
            })
        })
    })
});

describe('render from mock', () => {
    test('tuit list renders mocked', async () => {
        const mock = jest.spyOn(axios, 'get');
        mock.mockImplementation(() =>
            Promise.resolve({ data: { tuits: MOCKED_TUITS } }));

        const response = await services.findAllTuits();
        const tuits = response.tuits;
        mock.mockRestore();

        const deleteTuit = (tid) =>
            service.deleteTuit(tid)
                .then();

        render(
            <HashRouter>
                <Tuits tuits={tuits} deleteTuit={deleteTuit} />
            </HashRouter>);

        const expectations = [/alice's tuit/i, /bob's tuit/i, /charlie's tuit/i, /Alice/i, /Bob/i, /Charlie/i]

        expectations.forEach((expectation) => {
            let linkElements = screen.getAllByText(expectation);

            linkElements.forEach((element) => {
                expect(element).toBeInTheDocument();
            });
        })
    });
});
