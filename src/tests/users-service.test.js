import * as services from "./services";

describe('createUser', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    beforeAll(() => {
        return services.deleteUsersByUsername(ripley.username);
    });

    afterAll(() => {
        return services.deleteUsersByUsername(ripley.username);
    });

    test('can insert new users with REST API', async () => {
        const newUser = await services.createUser(ripley);

        expect(newUser.username).toEqual(ripley.username);
        // expect(newUser.password).toEqual(ripley.password);
        expect(newUser.email).toEqual(ripley.email);
    });
});

describe('deleteUsersByUsername', () => {
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    beforeAll(() => {
        return services.createUser(sowell);
    });

    afterAll(() => {
        return services.deleteUsersByUsername(sowell.username);
    });

    test('can delete users from REST API by username', async () => {
        const status = await services.deleteUsersByUsername(sowell.username);

        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('findUserById', () => {
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    beforeAll(() => {
        return services.deleteUsersByUsername(adam.username)
    });

    afterAll(() => {
        return services.deleteUsersByUsername(adam.username);
    });

    test('can retrieve user from REST API by primary key', async () => {
        const newUser = await services.createUser(adam);

        expect(newUser.username).toEqual(adam.username);
        // expect(newUser.password).toEqual(adam.password);
        expect(newUser.email).toEqual(adam.email);

        const existingUser = await services.findUserById(newUser._id);

        expect(existingUser.username).toEqual(adam.username);
        // expect(existingUser.password).toEqual(adam.password);
        expect(existingUser.email).toEqual(adam.email);
    });
});


describe('findAllUsers', () => {
    const usernames = [
        "larry", "curley", "moe"
    ];

    beforeAll(() =>
        usernames.map(username =>
            createUser({
                username,
                password: `${username}123`,
                email: `${username}@stooges.com`
            })
        )
    );

    afterAll(() => {
        let promises = []
        usernames.forEach((username) => {
            try {
                let deletePromise = services.deleteUsersByUsername(username);
                promises.push(deletePromise)
            } catch (err) {
                console.log(err)
            }
        })
        return Promise.all(promises)
    });

    test('can retrieve all users from REST API', async () => {
        const users = await services.findAllUsers();

        expect(users.length).toBeGreaterThanOrEqual(usernames.length);

        const usersWeInserted = users.filter(
            (user) => usernames.indexOf(user.username) >= 0);

        usersWeInserted.forEach(user => {
            const username = usernames.find(username => username === user.username);
            expect(user.username).toEqual(username);
            // expect(user.password).toEqual(`${username}123`);
            expect(user.email).toEqual(`${username}@stooges.com`);
        });
    });
});
