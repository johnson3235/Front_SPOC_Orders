import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ApiService } from '../token_services/Api_Service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent  implements OnInit{
  constructor(
    private service: MasterService, 
    private alert: ToastrService, 
    private router: Router,
    private modelservice:NgbModal,
    private apiService: ApiService,
    private toastr: ToastrService,
    ) { }

  @ViewChild('content') popupview !: ElementRef;

  Invoiceheader: any;
  pdfurl = '';
  invoiceno: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any>=new Subject<any>();

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
    lengthChange:false,
    language:{
      searchPlaceholder:'Text Customer'
    }

    };
    this.LoadInvoice();
    console.log("load3");
  }

  LoadInvoice() {
    this.service.GetAllInvoice().subscribe(res => {
      console.log("load1");
      console.log(res);
      this.Invoiceheader = res;
      this.dtTrigger.next(null);
    });
    console.log("load2");
  }

  invoiceremove(invoiceno: any) {

    if (confirm('Do you want to remove this Invoice :' + invoiceno)) {
      this.service.RemoveInvoice(invoiceno).subscribe(res => {
        let result: any;
        this.toastr.success('Removed Successfully');
        
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
  }

  Editinvoice(invoiceno: any) {
    this.router.navigateByUrl('/editinvoice/' + invoiceno);
  }
  PrintInvoice(invoiceno: any) {
    this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
  DownloadInvoice(invoiceno: any) {
    this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.download = invoiceno;
      a.href = url;
      a.click();
    });
  }

  PreviewInvoice(invoiceno: any) {
    this.invoiceno = invoiceno;
    this.service.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      this.pdfurl = url;
      this.modelservice.open(this.popupview, { size: 'lg' });
    });
  }
}
