import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ MenuService ]
})
export class SidebarComponent implements OnInit {
public menuType = ['default', 'mini'];
public type:any;
menuT='default';
  public settings: Settings;
  public menuItems:Array<any>;
  constructor(public appSettings:AppSettings, public menuService:MenuService) {
  console.log("type::", this.appSettings.settings.theme.menuType);
    this.type= this.appSettings.settings.theme.menuType;
      this.settings = this.appSettings.settings;
      this.menuItems = this.menuService.getVerticalMenuItems();
  }

  ngOnInit() {
    if(sessionStorage["userMenuItems"]) {
      let ids = JSON.parse(sessionStorage.getItem("userMenuItems"));
      let newArr = [];
      ids.forEach(id => {
        let newMenuItem = this.menuItems.filter(mail => mail.id == id);
        newArr.push(newMenuItem[0]);
      });
      this.menuItems = newArr;
    }
  }

  public closeSubMenus(){
    let menu = document.querySelector("#menu0");
    for (let i = 0; i < menu.children.length; i++) {
        let child = menu.children[i].children[1];
        if(child){
            if(child.classList.contains('show')){
              child.classList.remove('show');
              menu.children[i].children[0].classList.add('collapsed');
            }
        }
    }
  }

chooseMenuType(menuType){
console.log(menuType)
if(menuType=='default')
{
        this.appSettings.settings.theme.menuType= 'mini';
        console.log(this.appSettings.settings.theme.menuType)
         jQuery('.menu-item-link').tooltip('disable');
         this.type='mini';
           this.menuT = 'mini'
        }

if(menuType=='mini')
{
        this.appSettings.settings.theme.menuType= 'default';
        console.log(this.appSettings.settings.theme.menuType)
        jQuery('.menu-item-link').tooltip('enable');
        this.type='default';

         this.menuT = 'default'

        }


    }

}
