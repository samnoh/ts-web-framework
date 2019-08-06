export class UserForm {
    constructor(public parent: Element) {}

    eventsMap(): { [key: string]: (e?: Event) => void } {
        return {
            'click:button': this.onButtonClick,
            'mouseenter:h1': this.onHeaderHover
        };
    }

    onHeaderHover(e: Event): void {
        e.preventDefault();
        alert('Hello World');
    }

    onButtonClick(): void {
        console.log('Hi');
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, selector] = eventKey.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            });
        }
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <input />
                <button>Submit</button>
            </div>
        `;
    }

    render(): void {
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();

        this.bindEvents(templateElement.content);
        this.parent.append(templateElement.content);
    }
}