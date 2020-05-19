export type Callback = () => void;

export class Eventing {
    /**
     * Object properties are the event names. The value of a particular event is
     * an array of callback functions.
     */
    events: { [key: string]: Callback[] } = {};
    /**
     * Registers an event handler with this object, so other parts of the app
     * know when something changes.
     * @param eventName Name of the event.
     * @param callback Function to execute on trigger.
     */
    on = (eventName: string, callback: Callback): void => {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    /**
     * Triggers the event with the given name. Calls each callback in the
     * event's callback array.
     * @param eventName Name of the event to trigger.
     */
    trigger = (eventName: string): void => {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0) return;

        handlers.forEach(callback => {
            callback();
        });
    }
}