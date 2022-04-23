import * as services from "./services";

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
    let uidAdam;
    let uidBob;

    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        await services.deleteUsersByUsername(bob.username);
        const newUser = await services.createUser(adam);
        const newUser2 = await services.createUser(bob);

        uidAdam = newUser._id;
        uidBob = newUser2._id;
    });

    afterAll(() => {
        let promises = [];
        promises.push(services.deleteUsersByUsername(adam.username));
        promises.push(services.deleteUsersByUsername(bob.username));
        return Promise.all(promises);
    });

    test('follow and unfollow work as expected on valid data', async () => {
        console.log("NEW RUN STARTS!")
        console.log(await services.followUser(uidAdam, uidBob));
        let followersForBob = await services.findAllFollowersForUser(uidBob);
        console.log(followersForBob);
        expect(followersForBob.length).toBeGreaterThan(0);
        console.log(await services.unfollowUser(uidAdam, uidBob));
        followersForBob = await services.findAllFollowersForUser(uidBob);
        console.log(followersForBob);
        expect(followersForBob.length).toBe(0);
    });

    test('isFollowing REST API call works as expected on valid data', async () => {
        await services.followUser(uidAdam, uidBob);
        let status = await services.isFollowing(uidAdam, uidBob);
        console.log(status);
        expect(status).toBe(true)

        await services.unfollowUser(uidAdam, uidBob);
        status = await services.isFollowing(uidAdam, uidBob);

        expect(status).toBe(false)
    });
    
    test('Following invalid users returns error', async () => {
        const followUserResponse = await services.followUser("helloworld", "hello");
        console.log(`followUserResponse: ${JSON.stringify(followUserResponse)}`);
        expect(followUserResponse.name.toLowerCase()).toContain("error");
    });

    test('Unfollowing invalid users returns error', async () => {
        const followUserResponse = await services.unfollowUser("helloworld", "hello");
        console.log(`followUserResponse: ${JSON.stringify(followUserResponse)}`);
        expect(followUserResponse.name.toLowerCase()).toContain("error");
    });

    test('isFollowing on invalid users returns error', async () => {
        let status = await services.isFollowing("helloWorld", "hello");
        console.log(status);
        expect(status.name.toLowerCase()).toContain("error");
    });
    
});