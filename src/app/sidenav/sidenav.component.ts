import { Component, OnInit } from '@angular/core';
import {
  faDashboard,
  faLocation,
  faShop,
  faBox,
  faCapsules,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { MasterService } from '../service/master.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  faDashboard = faDashboard;
  faLocation = faLocation;
  faShop = faShop;
  faBox = faBox;
  faCapsules = faCapsules;
  faUser = faUser;

  constructor(private service: MasterService, private router: Router,private sanitizer: DomSanitizer) {}


  getImageSource(): SafeResourceUrl {
    // Path to the image in the assets directory
    const imagePath = 'assets/ev_logg.gif'; // Update with your image path
  
    // Create a safe URL for the image
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(imagePath);
  
    return safeUrl;
  }

  ngOnInit(): void {}
}
