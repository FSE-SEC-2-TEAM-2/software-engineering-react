import { act, create } from 'react-test-renderer';
import { TuitStats } from "../components/tuits/tuit-stats";

test('stats render correctly for dislike', () => {
    let stats = {
        likes: 123,
        replies: 234,
        bookmarks: 345,
        dislikes: 123,
        retuits: 345
    }

    const bookmarkTuit = () => {
        act(() => {
            stats.bookmarks--;
            tuitStats.update(
                <TuitStats
                    tuit={{ stats: stats }}
                    bookmarkTuit={() => { }}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                bookmarkTuit={bookmarkTuit}
                tuit={{ stats: stats }}
            />
        );
    })

    const root = tuitStats.root;

    const bookmarkCounter = root.findByProps({ className: 'ttr-stats-bookmarks' })
    const bookmarkCounterButton = root.findByProps({ className: 'ttr-bookmark-tuit-click' })

    let bookmarks = bookmarkCounter.children[0];
    expect(bookmarks).toBe('345');

    //Disliking a tuit and seeing that counter goes down
    act(() => { bookmarkCounterButton.props.onClick() })
    bookmarks = bookmarkCounter.children[0];
    expect(bookmarks).toBe('344');

});