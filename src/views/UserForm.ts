export class UserForm {
    /**
     * @param parent A reference to some HTML element that exists inside the DOM
     */
    constructor(public parent: Element) {}
    /**
     *
     */
    eventsMap(): { [key: string]: () => void } {
        return {
            "click:button": this.onButtonClick,
            "mouseenter:h1": this.onHeaderHover
        };
    }
    onButtonClick(): void {
        console.log("button was clicked");
    }
    onHeaderHover(): void {
        console.log("H1 was hovered over");
    }
    /**
     * Returns a string that contains a UserForm HTML template.
     */
    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input />
                <button>Click Me</button>
            </div>
        `;
    }
    /**
     * @param fragment reference to HTML we're trying to insert into the DOM.
     */
    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();
        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(":");

            fragment
                .querySelectorAll(selector)
                .forEach(element => {
                    element.addEventListener(eventName, eventsMap[eventKey]);
                });

        }
    }
    /* Take HTML template and append it as a child to this UserForm's parent. */
    render(): void {
        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content);
    }
}