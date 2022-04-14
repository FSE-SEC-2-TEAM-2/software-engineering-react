import {createNotification, findAllNotifications, findNotificationsForUser, deleteNotificationsById} from "./services";
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

describe('Can create notifications using the API', () => {
    let uidAdam;
    let uidBob;
    let notificationId;
    // sample notification to insert
    let notification = {
        subject_uid: uidAdam,
        verb: "followed",
        predicate_uid: uidBob,
        recipient: uidBob,
        subject_type: "user",
        predicate_type: "user"
    };
    // setup before running test
    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        await services.deleteUsersByUsername(bob.username);
        const newUser = await services.createUser(adam);
        const newUser2 = await services.createUser(bob);

        uidAdam = newUser._id;
        uidBob = newUser2._id;
        notification = {...notification, subject_uid: uidAdam, predicate_uid: uidBob, recipient: uidBob};
    })

    // clean up after test runs
    afterAll(async () => {
        let promises = [];
        promises.push(services.deleteUsersByUsername(adam.username));
        promises.push(services.deleteUsersByUsername(bob.username));
        promises.push(deleteNotificationsById(notificationId));
        return Promise.all(promises);
    });

    test('Create notification for user when a user follows another', async () => {

        // make notification and check that the fields are the same
        const createdNotification = await createNotification(notification)
        notificationId = createdNotification._id;
        expect(createdNotification.subject_uid).toBe(notification.subject_uid);
        expect(createdNotification.verb).toBe(notification.verb);
        expect(createdNotification.predicate_uid).toBe(notification.predicate_uid);
        expect(createdNotification.recipient).toBe(notification.recipient);
        expect(createdNotification.subject_type).toBe(notification.subject_type);
        expect(createdNotification.predicate_type).toBe(notification.predicate_type);
    });
});


describe('Can find notifications for user using the API', () => {
    let uidAdam;
    let uidBob;
    let notificationId;
    // sample notification to insert
    let notification = {
        subject_uid: uidAdam,
        verb: "followed",
        predicate_uid: uidBob,
        recipient: uidBob,
        subject_type: "user",
        predicate_type: "user"
    };
    // setup before running test
    beforeAll(async () => {
        await services.deleteUsersByUsername(adam.username);
        await services.deleteUsersByUsername(bob.username);
        const newUser = await services.createUser(adam);
        const newUser2 = await services.createUser(bob);
        uidAdam = newUser._id;
        uidBob = newUser2._id;
        notification = {...notification, subject_uid: uidAdam, predicate_uid: uidBob, recipient: uidBob};
    })

    // clean up after test runs
    afterAll(async () => {
        let promises = [];
        promises.push(services.deleteUsersByUsername(adam.username));
        promises.push(services.deleteUsersByUsername(bob.username));
        promises.push(deleteNotificationsById(notificationId));
        return Promise.all(promises);
    });

    test('can retrieve notifications belonging to a user', async () => {
        // make user bookmark tuit and check status to ok making sure it fulfilled
        const createdNotification = await createNotification(notification);
        const retrievedNotification = await findNotificationsForUser(uidBob);
        console.log("createdNotification: " + JSON.stringify(createdNotification));
        // console.log("retrievedNotification: " + JSON.stringify(retrievedNotification));
        notificationId = createdNotification._id;
        expect(retrievedNotification.length).toBe(1);
        expect(retrievedNotification[0].recipient).toBe(uidBob);
    });
});
