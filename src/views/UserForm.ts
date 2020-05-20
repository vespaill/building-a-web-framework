export class UserForm {
    /**
     * @param parent A reference to some HTML element that exists inside the DOM
     */
    constructor(public parent: Element) {}
    /**
     * Returns a string that contains a UserForm HTML template.
     */
    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input />
            </div>
        `;
    }
    /* Take HTML template and append it as a child to this UserForm's parent. */
    render(): void {
        const templateElement = document.createElement("template");
        templateElement.innerHTML = this.template();

        this.parent.append(templateElement.content);
    }
}