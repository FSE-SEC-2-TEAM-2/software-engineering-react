import * as services from "./services";

const sampleTuit = {
    tuit: 'Test Tuit 1',
};

const ripley = {
    username: 'ellenripley',
    password: 'lv426',
    email: 'ellenripley@aliens.com'
};

describe('test disliking', () => {
    let tid;
    let uid;

    beforeAll(async () => {
        await services.deleteUsersByUsername(ripley.username);
        const newUser = await services.createUser(ripley);

        const newTuit = await services.createTuit(newUser._id, sampleTuit);
        tid = newTuit._id;
        uid = newUser._id;
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(ripley.username));
        return Promise.all(promises);
    });

    afterEach(async () => {
        await services.deleteTuit(tid);
        const newTuit = await services.createTuit(uid, sampleTuit);
        tid = newTuit._id;
    })

    test('can dislike tuit with REST API', async () => {
        await services.userDislikesTuit(uid, tid);
        const status = await services.doesUserDislikeTuit(uid, tid);

        expect(status).toBe(true)
    });

    test('can undislike tuit with REST API', async () => {
        await services.userDislikesTuit(uid, tid);
        await services.userUndislikesTuit(uid, tid);
        const status = await services.doesUserDislikeTuit(uid, tid);

        expect(status).toBe(false)
    });

    test('can toggle dislike with REST API', async () => {
        await services.userTogglesDislike(uid, tid);
        let status = await services.doesUserDislikeTuit(uid, tid);

        expect(status).toBe(true)

        await services.userTogglesDislike(uid, tid);
        status = await services.doesUserDislikeTuit(uid, tid);

        expect(status).toBe(false)
    });
});