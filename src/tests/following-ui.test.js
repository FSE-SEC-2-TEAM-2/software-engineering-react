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
        // act(() => {
        //     return loggedInUserFollowsPoster;
        // })
    }
    const followUser = () => {
        loggedInUserFollowsPoster = true;
    }
    const unfollowUser = () => {
        loggedInUserFollowsPoster = false;
    }
    // const bookmarkTuit = () => {
    //     act(() => {
    //         stats.bookmarks--;
    //         tuitStats.update(
    //             <TuitStats
    //                 tuit={{ stats: stats }}
    //                 bookmarkTuit={() => { }}
    //             />)
    //     })
    // }

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
    const btn = root.findByProps({ className: 'ttr-tuit-general-btn' })//.childNode[0].innerText;
    const btnText = btn.children[0].props.children;
    // const unfollowBtn = root.findByProps({className: 'ttr-tuit-unfollow-btn'})

    // let bookmarks = bookmarkCounter.children[0];
    console.log(`follow btn : ${JSON.stringify(followBtn.props)}`);
    console.log(`follow btn : ${inspect(followBtn)}`);
    console.log(`general btn : ${JSON.stringify(btn.children[0].props)}`);
    // console.log(`unfollow btn : ${JSON.stringify(unfollowBtn)}`);

    // expect(btn.children[0].props).toBe('Follow');
    expect(btnText).toBe('Follow');

    
    act(() => {
            btn.children[0].props.onClick();
            console.log("onClick act() fired")
    });
    
    expect(btnText).toBe('Follow');

    //Disliking a tuit and seeing that counter goes down
    // act(() => { bookmarkCounterButton.props.onClick() })
    // bookmarks =  bookmarkCounter.children[0];
    // expect(bookmarks).toBe('344');

});