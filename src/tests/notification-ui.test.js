
import { screen, render } from "@testing-library/react";
import { act, create } from 'react-test-renderer';
import { HashRouter } from "react-router-dom";
import {Notification} from "../components/notifications/notification";


const DUMMY_NOTIFICATION =
    {
        "_id": "62588c71b87d780bc0cc1000",
        "subject_uid": {
          "_id": "6251497943b37e7e56445153",
          "username": "adam_smith",
          "password": "not0sum",
          "email": "wealth@nations.com",
          "accountType": "PERSONAL",
          "maritalStatus": "SINGLE",
          "joined": "2022-04-09T08:53:13.869Z"
        },
        "subject_type": "user",
        "verb": "followed",
        "predicate_uid": {
          "_id": "6251497c43b37e7e56445155",
          "username": "lucy_smith",
          "password": "lucy_pwd",
          "email": "lucy@gmail.com",
          "accountType": "PERSONAL",
          "maritalStatus": "SINGLE",
          "joined": "2022-04-09T08:53:16.979Z"
        },
        "predicate_type": "user",
        "recipient": "6251497c43b37e7e56445155",
        "NotifiedOn": "2022-04-14T21:04:49.879Z"
      };

test('tuit list renders static tuit array', () => {
    render(
      <HashRouter>
        <Notification notification={DUMMY_NOTIFICATION}/>
      </HashRouter>
    );
    const alice_tuit = screen.getByText(/follow/i);
    expect(alice_tuit).toBeInTheDocument();
    const bob_tuit = screen.getByText(/adam_smith/i);
    expect(bob_tuit).toBeInTheDocument();
    const charlie_tuit = screen.getByText(/adam_smith followed you/i);
    expect(charlie_tuit).toBeInTheDocument();
});


test('notification deletion works correctly', () => {
    let dummyNotification2 =
    {
        "_id": "62588c71b87d780bc0cc1000",
        "subject_uid": {
          "_id": "6251497943b37e7e56445153",
          "username": "adam_smith",
          "password": "not0sum",
          "email": "wealth@nations.com",
          "accountType": "PERSONAL",
          "maritalStatus": "SINGLE",
          "joined": "2022-04-09T08:53:13.869Z"
        },
        "subject_type": "user",
        "verb": "followed",
        "predicate_uid": {
          "_id": "6251497c43b37e7e56445155",
          "username": "lucy_smith",
          "password": "lucy_pwd",
          "email": "lucy@gmail.com",
          "accountType": "PERSONAL",
          "maritalStatus": "SINGLE",
          "joined": "2022-04-09T08:53:16.979Z"
        },
        "predicate_type": "user",
        "recipient": "6251497c43b37e7e56445155",
        "NotifiedOn": "2022-04-14T21:04:49.879Z"
      };
    const deleteNotification = () => {
        act(() => {
            dummyNotification2 = {verb: "followed", subject_uid: {username: "deleted"}};
            notificationComponent.update(
                <Notification
                    notification={dummyNotification2}
                    deleteNotification={() => { }}
                />)
        })
    }

    let notificationComponent
    act(() => {
        notificationComponent = create(
            <Notification
                notification={dummyNotification2}
                deleteNotification={deleteNotification}
            />
        );
    })

    let root = notificationComponent.root;
    
    const deleteBtn = root.findByProps({ className: 'fas fa-remove fa-2x fa-pull-right' })
    let displayedElement = root.findByProps({ className: 'ttr-notification-string' });
    // console.log(JSON.stringify(displayedElement.children[0]));
    // let foundDisplayedText = screen.getByText(/adam_smith/i);
    let displayedElementText = displayedElement.children[0];
    expect(displayedElementText).toBe("adam_smith");

    //Deleting a notification and seeing that it goes away
    act(() => { deleteBtn.props.onClick() })
    displayedElementText = displayedElement.children[0];
    expect(displayedElementText).toBe("deleted");

});