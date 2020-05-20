import { User } from "../models/User";

export class UserForm {
    /**
     * @param parent A reference to some HTML element that exists inside the DOM
     */
    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }
    /**
     *
     */
    bindModel(): void {
        this.model.on("change", () => {
            this.render();
        });
    }
    /**
     *
     */
    eventsMap(): { [key: string]: () => void } {
        return {
            "click:.set-age": this.onSetAgeClick,
            "click:.set-name": this.onSetNameClick
        };
    }
    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }
    onSetNameClick = (): void => {
        const input = this.parent.querySelector("input");
        const name = input.value;
        this.model.set({ name });
    }
    /**
     * Returns a string that contains a UserForm HTML template.
     */
    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <div>User name: ${this.model.get('name')}</div>
                <div>User name: ${this.model.get('age')}</div>
                <input />
                <button class="set-name">Change Name</button>
                <button class="set-age">Set Random Age</button>
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
        this.parent.innerHTML = "";
        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content);
    }
}