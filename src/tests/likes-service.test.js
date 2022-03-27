import * as services from "./services";

const sampleTuit = {
    tuit: 'Test Tuit 2',
};

const adam = {
    username: 'adam_smith',
    password: 'not0sum',
    email: 'wealth@nations.com'
};

describe('test liking', () => {
    let tid;
    let uid;

    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        const newUser = await services.createUser(adam);

        const newTuit = await services.createTuit(newUser._id, sampleTuit);
        tid = newTuit._id;
        uid = newUser._id;
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(adam.username));
        return Promise.all(promises);
    });

    afterEach(async () => {
        await services.deleteTuit(tid);
        const newTuit = await services.createTuit(uid, sampleTuit);
        tid = newTuit._id;
    })

    test('can like tuit with REST API', async () => {
        await services.userLikesTuit(uid, tid);
        const status = await services.doesUserLikeTuit(uid, tid);

        expect(status).toBe(true)
    });

    test('can unlike tuit with REST API', async () => {
        await services.userLikesTuit(uid, tid);
        await services.userUnlikesTuit(uid, tid);
        const status = await services.doesUserLikeTuit(uid, tid);

        expect(status).toBe(false)
    });

    test('can toggle like with REST API', async () => {
        await services.userTogglesLike(uid, tid);
        let status = await services.doesUserLikeTuit(uid, tid);

        expect(status).toBe(true)

        await services.userTogglesLike(uid, tid);
        status = await services.doesUserLikeTuit(uid, tid);

        expect(status).toBe(false)
    });
});