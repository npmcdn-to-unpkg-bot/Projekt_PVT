import {Component, Output, Input, EventEmitter, OnInit, OnChanges, selectedDate} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {DatasourceService} from '../service/datasource.service';
import {Menu} from '../interface/menu';

@Component({
    selector: 'choose-source',
    templateUrl: 'app/html/choose-datasource.html',
    providers: [DatasourceService, HTTP_PROVIDERS]
})
export class ChooseSource implements OnInit {
    @Output() sourceOutput: EventEmitter = new EventEmitter();
    source: Object = null;
    database: string;

    menu: Menu[];
    underMenu: String[][];
    errorMessage: string;
    
    constructor(private datasourceService: DatasourceService) {
    }
    
    private ngOnInit(): void {
         this.datasourceService.getMenu()
             .subscribe(
                menu => this.menu = menu,
                error =>  this.errorMessage = <any>error);

    }

    private fillUnderMenu(index: number): void {
        this.underMenu = this.menu[index].values;
    }
    
    public onUnderMenuClick(index: number): void {
        this.source = {database: this.database, dataset: this.underMenu[index][0]};
        this.sourceOutput.emit(this.source);
    }
    
    public onMenuClick(value, index: number): void {
        this.database = this.menu[index].database_link;
        this.fillUnderMenu(index);
    }
}