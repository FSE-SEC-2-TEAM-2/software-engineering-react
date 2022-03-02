import * as services from "./services";

const sampleTuit = {
    tuit: 'Test Tuit 1',
};

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

describe('can create tuit with REST API', () => {
    let tid;

    beforeAll(async () => {
        let promises = [];
        await services.deleteUsersByUsername(ripley.username);
        promises.push(services.createUser(ripley));
        return Promise.all(promises);
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('can create a tuit', async () => {
        const user = await services.findUserByUsername(ripley.username);

        const newTuit = await services.createTuit(user._id, sampleTuit);
        tid = newTuit._id;

        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleTuit.postedBy);
    });
});

describe('can delete tuit wtih REST API', () => {
    let tid;

    beforeAll(async () => {
        await services.deleteUsersByUsername(ripley.username);
        const newUser = await services.createUser(ripley);

        const newTuit = await services.createTuit(newUser._id, sampleTuit);
        tid = newTuit._id;
        return tid;
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('delete tuit by PK', async () => {
        const status = await services.deleteTuit(tid);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    let tid;

    beforeAll(async () => {
        await services.deleteUsersByUsername(ripley.username);
        const newUser = await services.createUser(ripley);

        const newTuit = await services.createTuit(newUser._id, sampleTuit);
        tid = newTuit._id;
        return tid;
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    test('retrieve Tuit by PK', async () => {
        const tuit = await services.findTuitById(tid);

        expect(tuit.tuit).toEqual(sampleTuit.tuit);
        expect(tuit.postedBy._id).toEqual(sampleTuit.postedBy);
    })
});

describe('can retrieve all tuits with REST API', () => {
    let tids = [];
    let tuits = [];

    beforeAll(async () => {
        await services.deleteUsersByUsername(ripley.username);
        const newUser = await services.createUser(ripley);

        for (let tuitCount = 0; tuitCount < 5; tuitCount++) {
            const tuit = `Test Tuit ${tuitCount + 1}`;
            sampleTuit.tuit = tuit;

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
        promises.push(services.deleteUsersByUsername(ripley.username));

        return Promise.all(promises);
    });

    test('Retrieve all Tuits', async () => {
        const allTuits = await services.findAllTuits();
        const user = await services.findUserByUsername(ripley.username);

        const createdTuits = allTuits.filter(
            (tuit) => tids.indexOf(tuit._id) >= 0);

        expect(allTuits.length).toBeGreaterThanOrEqual(tids.length);

        createdTuits.forEach((tuit) => {
            const tid = tids.find((tid) => tid === tuit._id);
            expect(tuit.tuit).toEqual(tuits[(tids.indexOf(tid))]);
            expect(tuit.postedBy._id).toEqual(user._id);
        });
    })
});
