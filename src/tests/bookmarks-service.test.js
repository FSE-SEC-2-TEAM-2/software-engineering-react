import {
    doesUserBookmarkTuit,
    findAllTuitsBookmarkedByUser,
    userTogglesTuitBookmarks
} from "../services/bookmarks-service";
import { createTuit, createUser, deleteTuit, deleteUsersByUsername } from "./services";
import { findNotificationsForUser } from "../services/notification-service";

describe('userTogglesTuitBookmarks', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };
    // sample tuit to insert and bookmark
    const theTuit = {
        tuit: "bookmark tuit test"
    };

    let tid;
    let uid;

    // setup test before running test
    beforeAll(async () => {

        await deleteUsersByUsername(ripley.username);
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser._id, theTuit);
        tid = newTuit._id;
        uid = newUser._id;
    })

    // clean up after test runs
    afterAll(async () => {
        let promises = [];
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuit(tid));
        return Promise.all(promises);
    });

    test('bookmark tuit test', async () => {

        // make user bookmark tuit and check status to ok making sure it fulfilled
        const newBookmark = await userTogglesTuitBookmarks(uid, tid)
        expect(newBookmark).toEqual("OK")

        // we now check if user actually bookmarked tuit
        const checkIfBookmarked = await doesUserBookmarkTuit(uid, tid)
        expect(checkIfBookmarked).toEqual(true)

        // User now bookmarks the tuit(aka removes bookmark)
        const newBookmark2 = await userTogglesTuitBookmarks(uid, tid)
        expect(newBookmark2).toEqual("OK")

        // Check that user bookmark the tuit and return proper result.
        const checkIfBookmarkRemoved = await doesUserBookmarkTuit(uid, tid)
        expect(checkIfBookmarkRemoved).toEqual(false)


        const notification = await findNotificationsForUser(uid)

        console.log(notification)

    });
});

describe('findAllTuitsBookmarkedByUser', () => {
    // sample user to insert
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    // sample tuit to insert and bookmarked
    const tuit1 = {
        tuit: "bookmark tuit test 1"
    };

    const tuit2 = {
        tuit: "bookmark tuit test 2"
    };

    let tid1;
    let tid2;
    let uid;

    // setup test before running test
    beforeAll(async () => {

        await deleteUsersByUsername(ripley.username);
        const newUser = await createUser(ripley);

        const newTuit = await createTuit(newUser._id, tuit1);
        const newTuit2 = await createTuit(newUser._id, tuit2);
        tid1 = newTuit._id;
        tid2 = newTuit2._id;
        uid = newUser._id;
    })

    // clean up after test runs
    afterAll(async () => {
        let promises = [];
        promises.push(deleteUsersByUsername(ripley.username));
        promises.push(deleteTuit(tid1));
        promises.push(deleteTuit(tid2));
        return Promise.all(promises);
    });

    test('find all user who bookmark tuit', async () => {

        // make users bookmark tuit
        await userTogglesTuitBookmarks(uid, tid1)
        await userTogglesTuitBookmarks(uid, tid2)

        //Test find all user who bookmarked tuit
        const allTuitBookmarkedByUser = await findAllTuitsBookmarkedByUser(uid)
        expect(allTuitBookmarkedByUser[0]["tuit"]).toEqual("bookmark tuit test 1")
        expect(allTuitBookmarkedByUser[1]["tuit"]).toEqual("bookmark tuit test 2")

        // make users bookmark tuit
        await userTogglesTuitBookmarks(uid, tid1)
        await userTogglesTuitBookmarks(uid, tid2)

    });
});