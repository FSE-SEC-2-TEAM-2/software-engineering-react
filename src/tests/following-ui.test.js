import { act, create } from 'react-test-renderer';
import {TuitStats} from "../components/tuits/tuit-stats";
import {Tuit} from "../components/tuits/tuit";
import {inspect} from 'util';

test('tuit component renders follow button correctly', () => {
    let loggedInUserFollowsPoster = true;
    const poster = {
        _id: '123',
        username: 'shayan',
        email: 'shayan@abc.com'
    };
    let tuit = {
        postedBy: poster,
        tuit: 'hello world!'
    }
    const loggedInUserId = 'not123';
    const isFollowing = (loggedInId, posterId) => {
        return act(() => {
            console.log(`loggedInId: ${loggedInId} posterId: ${posterId}`)
            tuitComponent.update(
                <Tuit
                    tuit={tuit}
                    loggedInUserId={loggedInUserId}
                    followUser={followUser}
                    unfollowUser={unfollowUser}
                    isFollowing={() => {}}
                />)
            return new Promise((resolve, reject) => {
                resolve(loggedInUserFollowsPoster);
            })
        })
    }
    const followUser = () => {
        loggedInUserFollowsPoster = true;
    }
    const unfollowUser = () => {
        loggedInUserFollowsPoster = false;
    }

    let tuitComponent;
    act(() => {
        tuitComponent = create(
            <Tuit
                tuit={tuit}
                loggedInUserId={loggedInUserId}
                followUser={followUser}
                unfollowUser={unfollowUser}
                isFollowing={isFollowing}
            />
        );
    })

    const root = tuitComponent.root;

    const followBtn = root.findByProps({ className: 'ttr-tuit-follow-btn' })
    const btn = root.findByProps({ className: 'ttr-tuit-general-btn' })
    const btnText = btn.children[0].props.children;

    console.log(`follow btn : ${JSON.stringify(followBtn.props)}`);
    console.log(`follow btn : ${inspect(followBtn)}`);
    console.log(`general btn : ${JSON.stringify(btn.children[0].props)}`);

    expect(btnText).toBe('Follow');

    
    act(() => {
            btn.children[0].props.onClick();
            console.log("onClick act() fired")
    });
    
    expect(btnText).toBe('Follow');
});