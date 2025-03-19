// FullPageLoader.tsx
import React, { useEffect, useState } from 'react';

interface Payload {
    label: string;
}

type Callback = (input: any) => void;

enum Events {
    Update,
    Dismiss,
}

/**
 * This is our event manager to emit custom event
 */
const EventManager = {
    eventList: new Map(),

    on: function (event: Events, callback: Callback) {
        this.eventList.set(event, callback);
        return this;
    },

    off: function (event: Events) {
        this.eventList.delete(event);
    },

    emit: function (event: Events, payload?: Payload) {
        if (this.eventList.has(event)) {
            console.log(`Event emitted: ${Events[event]}`, payload); // Debugging log
            this.eventList.get(event)?.(payload);
        }
    },
};

/**
 * This is the main component which keeps watching of different events
 * And show hide itself or update
 */
export const FullPageLoaderComponent: React.FC = () => {
    const [state, setMyState] = useState<{ show: boolean; label: string }>({
        show: false,
        label: '',
    });

    const setState = (newObj: { show?: boolean; label?: string }) => {
        setMyState((prev) => ({ ...prev, ...newObj }));
    };

    useEffect(() => {
        EventManager.on(Events.Update, (data) => {
            console.log('Update event received', data); // Debugging log
            setState({ label: data?.label, show: true });
        });
        EventManager.on(Events.Dismiss, () => {
            console.log('Dismiss event received'); // Debugging log
            setState({ show: false });
        });
    }, []);

    return (
        <>
            {state.show ? (
                <div className='loader-container'>
                    <div className='bottom-container'>
                        <div className="loader"></div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

/**
 * These are exposed functions to deal with loader from outside of the component
 */
export const FullPageLoader = {
    open: function (payload?: Payload) {
        EventManager.emit(Events.Update, payload);
    },
    close: function () {
        EventManager.emit(Events.Dismiss);
    },
};
