import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoListComponent } from "./todo-list.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";

describe("Todo list", () => {

    let todoList: TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;

    let todoListServiceStub: {
        getTodos: () => Observable<Todo[]>
    };

    beforeEach(() => {
        // stub UserService for test purposes
        todoListServiceStub = {
            getTodos: () => Observable.of([
                {
                    id: "588959856f0b82ee93cd93eb",
                    owner: "Barry",
                    status: true,
                    body: "Nisi sit non non sunt veniam pariatur. Elit reprehenderit aliqua consectetur est dolor officia et adipisicing elit officia nisi elit enim nisi.",
                    category: "video games"
                },
                {
                    id: "5889598585bda42fb8388ba1",
                    owner: "Blanche",
                    status: false,
                    body: "Laborum incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad. Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.",
                    category: "homework"
                },
                {
                    id: "588959850ccede43cc675826",
                    owner: "Blanche",
                    status: true,
                    body: "Nostrud ullamco labore exercitation magna. Excepteur aute aliqua veniam veniam nisi eu occaecat ea magna do.",
                    category: "homework"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub } ]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoListComponent);
            todoList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the todos", () => {
        expect(todoList.todos.length).toBe(3);
    });

    //Owner tests
    it("contains a user named 'Barry'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Barry" )).toBe(true);
    });

    it("contain a user named 'Blanche'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Blanche" )).toBe(true);
    });

    it("doesn't contain a user named 'Santa'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.owner === "Santa" )).toBe(false);
    });


    //body tests

    it("contains a todo whose body text contains 'occaecat'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.body.indexOf("occaecat", 0) > 0)).toBe(true);
    });

    it("contains a todo whose body text doesn't contain 'occaekitten'", () => {
        expect(todoList.todos.some((todo: Todo) => todo.body.indexOf("occaekitten", 0) > 0)).toBe(false);
    });

    //status

    it("contains two statuses that are true", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.status === true).length).toBe(2);
    });

    //category

    it("has two users with category homework", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "homework").length).toBe(2);
    });

    it("doesn't have any users with category astronomy", () => {
        expect(todoList.todos.filter((todo: Todo) => todo.category === "astronomy").length).toBe(0);
    });

});
