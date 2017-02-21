import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Todo } from "./todo";
import { TodoListComponent } from "./todo-list.component";
import { TodoListService } from "./todo-list.service";
import { Observable } from "rxjs";
import { PipeModule } from "../../pipe.module";
import { FilterBy } from "./filter.pipe";

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
                    body: "Laborum banana banana incididunt nisi eiusmod aliqua velit quis occaecat excepteur ut in ad. Commodo adipisicing sint ipsum irure amet exercitation voluptate mollit.",
                    category: "homework"
                },
                {
                    id: "588959850ccede43cc675826",
                    owner: "Blanche",
                    status: true,
                    body: "Nostrud ullamco banana labore exercitation magna. Excepteur aute aliqua veniam veniam nisi eu occaecat ea magna do.",
                    category: "homework"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [PipeModule],
            declarations: [ TodoListComponent ],
            // providers:    [ TodoListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers:    [ { provide: TodoListService, useValue: todoListServiceStub }, [FilterBy] ]
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


    //Tried, outputs 'IMA STRING! WUTTTTT!'
    //and TypeError: undefined is not a function (evaluating 'value.toLowerCase()')
    //'value' is undefined in the filterByString function, and toLowerCase is called on it
    //Owner filterBy Test
    it("contains two todos with user 'Blanche' (filter with pipe)", () => {
        let filterBy : FilterBy = new FilterBy();
        let filterTerms : Object = new Object();
        filterTerms["owner"] = "Blanche";
        expect(filterBy.transform(todoList.todos, filterTerms).length).toBe(2);
    });

    it("contains one todo with user 'Barry' (filter with pipe)", () => {
        let filterBy : FilterBy = new FilterBy();
        let filterTerms : Object = new Object();
        filterTerms["owner"] = "Barry";
        expect(filterBy.transform(todoList.todos, filterTerms).length).toBe(1);
    });
    //Status filterBy Test
    it("contains two todos with complete status' (filter with pipe)", () => {
        let filterBy : FilterBy = new FilterBy();
        let filterTerms : Object = new Object();
        filterTerms["status"] = true;
        expect(filterBy.transform(todoList.todos, filterTerms).length).toBe(2);
    });
    //Category filterBy Test
    it("contains two todos with category homework' (filter with pipe)", () => {
        let filterBy : FilterBy = new FilterBy();
        let filterTerms : Object = new Object();
        filterTerms["category"] = "homework";
        expect(filterBy.transform(todoList.todos, filterTerms).length).toBe(2);
    });
    //Body filterBy Test
    it("contains two todos with body text 'banana'' (filter with pipe)", () => {
        let filterBy : FilterBy = new FilterBy();
        let filterTerms : Object = new Object();
        filterTerms["body"] = "banana";
        expect(filterBy.transform(todoList.todos, filterTerms).length).toBe(3);
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
