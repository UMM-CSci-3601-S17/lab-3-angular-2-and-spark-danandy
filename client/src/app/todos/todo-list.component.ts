import { Component, OnInit } from '@angular/core';
import { TodoListService } from "./todo-list.service";
import { Todo } from "./todo";
import { FilterBy } from "./filter.pipe";

@Component({
    selector: 'todo-list-component',
    templateUrl: 'todo-list.component.html',
    providers: [FilterBy],
})

export class TodoListComponent implements OnInit {
    static ColorBinds = new Array<string>();
    public todos: Todo[];

    constructor(private todoListService: TodoListService) {
        // this.todos = todoListService.getTodos();
    }
    ngOnInit(): void {
        this.todoListService.getTodos().subscribe(
            todos => this.todos = todos,
            err => {
                console.log(err);
            }
        );
    }

    public static getRandomColor() : string
    {
        return "hsl(" + Math.round(359*Math.random())+",40%,81%)";
    }

    public getColor(category : string) : string
    {
        var clrBinding:string = TodoListComponent.ColorBinds[category];
        if(clrBinding == null) // If this category doesnt exist in the mapping, grab a new random color
        {
            TodoListComponent.ColorBinds[category] = TodoListComponent.getRandomColor();
            return TodoListComponent.ColorBinds[category];
        }
        else
            return clrBinding;
    }


}


