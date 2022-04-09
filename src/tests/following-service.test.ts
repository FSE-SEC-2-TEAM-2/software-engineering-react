import * as services from "./services";

// const sampleTuit = {
//     tuit: 'Test Tuit 2',
// };

const adam = {
    username: 'adam_adam',
    password: 'not0sum',
    email: 'wealth@nations.com'
};
const bob = {
    username: 'bob_builder',
    password: 'bob_pwd',
    email: 'bob@bob.com'
};

describe('test follows and unfollows', () => {
    // let tid;
    let uidAdam;
    let uidBob;

    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        await services.deleteUsersByUsername(bob.username);
        const newUser = await services.createUser(adam);
        const newUser2 = await services.createUser(bob);

        // const newTuit = await services.createTuit(newUser._id, sampleTuit);
        // tid = newTuit._id;
        uidAdam = newUser._id;
        uidBob = newUser2._id;
    });

    afterAll(() => {
        let promises = [];
        // promises.push(services.deleteTuit(tid));
        promises.push(services.deleteUsersByUsername(adam.username));
        promises.push(services.deleteUsersByUsername(bob.username));
        return Promise.all(promises);
    });

    // afterEach(async () => {
    //     await services.deleteTuit(tid);
    //     const newTuit = await services.createTuit(uid, sampleTuit);
    //     tid = newTuit._id;
    // })

    // test('can follow user with REST API', async () => {
    //     await services.userLikesTuit(uid, tid);
    //     const status = await services.doesUserLikeTuit(uid, tid);

    //     expect(status).toBe(true)
    // });

    test('Can follow and unfollow users', async () => {
        console.log(await services.followUser(uidAdam, uidBob));
        let followersForBob = await services.findAllFollowersForUser(uidBob);
        let usersAdamFollows = await services.findAllUsersFollowedByUser(uidAdam);
        console.log(followersForBob);
        expect(followersForBob.length).toBeGreaterThan(0);
        followersForBob = followersForBob.filter(following => {
            return following.userFollowing._id === uidAdam
        });
        expect(followersForBob.length).toBeGreaterThan(0);

        // await services.unfollowUser(uidAdam, uidBob);
        // followersForBob = await services.findAllFollowersForUser(uidBob);
        // if(followersForBob.length > 0) {
        //     followersForBob = followersForBob.filter(following => {
        //         return following.userFollowing._id === uidAdam
        //     });
        // }
        // console.log(followersForBob);
        // expect(followersForBob.length).toBeLessThan(1);
    });

    test('isFollowing REST API call works as expected', async () => {
        await services.followUser(uidAdam, uidBob);
        let status = await services.isFollowing(uidAdam, uidBob);
        console.log(status);
        expect(status).toBe(true)

        await services.unfollowUser(uidAdam, uidBob);
        status = await services.isFollowing(uidAdam, uidBob);

        expect(status).toBe(false)
    });

    // test('sanity test', async () => {
    //     let status = await services.isFollowing('6251497c43b37e7e56445155', '6251497943b37e7e56445153');
    //     console.log(status);
    //     expect(status).toBe(true)
    // });
});
//http://localhost:4000/users/6251497c43b37e7e56445155/following/6251497943b37e7e56445153