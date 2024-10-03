import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AcceptleavComponent } from './views/admin/acceptleav/acceptleav.component';
import { AddrecrequestComponent } from './views/front/addrecrequest/addrecrequest.component';
import { EditleavComponent } from './views/admin/editleav/editleav.component';
import { LeavcalendarComponent } from './views/admin/leavcalendar/leavcalendar.component';
import { LeavdashboardComponent } from './views/admin/leavdashboard/leavdashboard.component';
import { LeavdisplayComponent } from './views/admin/leavdisplay/leavdisplay.component';
import { LeaveViewComponent } from './views/admin/leave-view/leave-view.component';
import { LecalendarComponent } from './views/front/lecalendar/lecalendar.component';
import { NotificationComponent } from './views/admin/notification/notification.component';
import { RatingComponent } from './views/front/rating/rating.component';
import { ReccalendarComponent } from './views/front/reccalendar/reccalendar.component';
import { RemoveleavComponent } from './views/admin/removeleav/removeleav.component';
import { ProfileComponent } from './authentication/component/profile/profile.component';
import { SigninComponent } from './authentication/component/signin/signin.component';
import { SignupComponent } from './authentication/component/signup/signup.component';
import { UpdateComponent } from './authentication/component/update/update.component';
import { RecruitmentformComponent } from './views/front/recruitmentform/recruitmentform.component';
import { DatePipe } from '@angular/common';
import { AddConsultantComponent } from './views/admin/add-consultant/add-consultant/add-consultant.component';
import { AddCustomerTrackingComponent } from './views/admin/add-customer-tracking/add-customer-tracking/add-customer-tracking.component';
import { AffecterUserPortfolioComponent } from './views/admin/affecter-user-portfilio/affecter-user-portfolio/affecter-user-portfolio.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RetrieveAllConsultantComponent } from './views/admin/retriev-all-consultant/retrieve-all-consultant/retrieve-all-consultant.component';
import { TimestampToDatePipe } from './models/timestamp-to-date.pipe';
import { UpdateConsultantComponent } from './views/admin/update-consultant/update-consultant/update-consultant.component';
import { CustomerTrackingComponent } from './views/admin/retrieve-aall-customer-tracking/customer-tracking/customer-tracking.component';
import { DeleteCustomerTrackingModule } from './views/admin/delete-customer-tracking/delete-customer-tracking.module';
import { DesaffceterUserModule } from './views/admin/desaffceter-user/desaffceter-user.module';
import { AffecterPortfolioAConsultantModule } from './views/admin/affecter-portfolio-aconsultant/affecter-portfolio-aconsultant.module';
import { PayrollViewerComponent } from './views/front/payroll/payroll-viewer/payroll-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskAddComponent } from './views/admin/task-add/task-add.component';
import { UpdateProjectComponent } from './views/admin/update-project/update-project/update-project.component';
import { UpdatetaskComponent } from './views/admin/updatetask/updatetask/updatetask.component';
import { ProjectComponent } from './views/admin/project/project/project.component';
import { DetailleprojectComponent } from './views/admin/project/detailleproject/detailleproject.component';
import { AfficheprojectComponent } from './views/admin/project/afficheproject/afficheproject.component';
import { UpdatetaskModule } from './views/admin/updatetask/updatetask.module';
import { ProductListComponent } from './Components/list-product/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product/add-product.component';
import { ProductEditComponentComponent } from './Components/product-edit-component/product-edit-component.component';
import { FrontProductComponent } from './Components/FrontOfficeComponent/front-product/front-product.component';
import { DetailsComponent } from './Components/details/details.component';
import { CartComponent } from './Components/cart/cart.component';
import { PdfGeneratorComponent } from './Components/pdf-generator/pdf-generator.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';
import { PyramidChartComponent } from './Components/pyramid-chart/pyramid-chart.component';
import { FrontDetailComponent } from './Components/front-detail/front-detail.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CommandComponent } from './Components/command/command.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CrmDashboardModule } from './views/admin/crm-dashboard/crm-dashboard.module';
import { AfficherConsultantsComponent } from './views/front/afficher-consultants/afficher-consultants/afficher-consultants.component';
import { AfficherConsultantsModule } from './views/front/afficher-consultants/afficher-consultants.module';
import { PlanifierReunionComponent } from './views/admin/planifier-reunion/planifier-reunion/planifier-reunion.component';
import { PlanifierReunionModule } from './views/admin/planifier-reunion/planifier-reunion.module';

import { ContactModule } from './views/front/contact/contact.module';



import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './mainChat/main.component';
import { UserComponent } from './user/user.component';
import { PlanificationMeetComponent } from './views/front/planification-meet/planification-meet/planification-meet.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { ProductionsComponent } from './Components/productions/productions.component';
import { BackendComponent } from './Components/backend/backend.component';
import { ProdDashComponent } from './Components/prod-dash/prod-dash.component';
import { StatsComponent } from './Components/stats/stats.component';
import { DefectsComponent } from './Components/defects/defects.component';
import { ProductionAddComponent } from './Components/production-add/production-add.component';
import { AddMvtComponent } from './Components/add-mvt/add-mvt.component';
import { MouvementStockComponent } from './Components/mouvement-stock/mouvement-stock.component';
import { StockDashComponent } from './Components/stock-dash/stock-dash.component';
import { BubbleChartComponent } from './Components/bubble-chart/bubble-chart.component';
import { BarcodeComponent } from './Components/barcode/barcode.component';
import { BarcodesModule } from '@progress/kendo-angular-barcodes';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CheckoutNewComponent } from './Components/checkout-new/checkout-new.component';
import { RecStatsComponent } from './views/front/rec-stats/rec-stats.component';
import { AddrecruitmentComponent } from './views/admin/addrecruitment/addrecruitment.component';
import { ToastrModule } from 'ngx-toastr';import { RecruitmentchartsComponent } from './views/front/recruitmentcharts/recruitmentcharts.component';import { CandidatedisplayComponent } from './views/admin/candidatedisplay/candidatedisplay.component';
import { RecruitdisplayComponent } from './views/admin/recruitdisplay/recruitdisplay.component';
import { AddcandidateComponent } from './views/admin/addcandidate/addcandidate.component';
import { AssigcandidtorecComponent } from './views/admin/assigcandidtorec/assigcandidtorec.component';
import { CandidateinfoComponent } from './views/admin/candidateinfo/candidateinfo.component';
import { ExperiencematchingComponent } from './views/admin/experiencematching/experiencematching.component';
import { CandrecComponent } from './views/front/candrec/candrec.component';
import { AvgsalaryComponent } from './views/front/avgsalary/avgsalary.component';
import { OpbylocationComponent } from './views/front/opbylocation/opbylocation.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskAddComponent,
    RecruitmentformComponent, 
    EditleavComponent,
    LeavdisplayComponent,
    RemoveleavComponent,
    LeavcalendarComponent,
    LecalendarComponent,
    AddrecrequestComponent,
    NotificationComponent,
    AcceptleavComponent,
    RatingComponent,
    ReccalendarComponent,
    LeaveViewComponent,
    LeavdashboardComponent,
    PayrollViewerComponent,
    RecruitmentformComponent,
    AddCustomerTrackingComponent,
    //AddConsultantComponent, 
    AffecterUserPortfolioComponent,
    //RetrieveAllConsultantComponent,
    // UpdateConsultantComponent ,
    CustomerTrackingComponent,
    AcceptleavComponent,
    AddrecrequestComponent,
    EditleavComponent,
    LeavcalendarComponent,
    LeavdashboardComponent,
    LeavdisplayComponent,
    LeaveViewComponent,
    LecalendarComponent,
    NotificationComponent,
    RatingComponent,
    ReccalendarComponent,
    RemoveleavComponent,
    SigninComponent,
    SignupComponent,
    ProfileComponent,
    UpdateComponent,
    //AfficherConsultantsComponent,
    // DHOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUHA
    ProductListComponent,
    AddProductComponent,
    ProductEditComponentComponent,
    FrontProductComponent,
    DetailsComponent,
    CartComponent,
    PieChartComponent,
    PdfGeneratorComponent,
    WishlistComponent,
    BarChartComponent,
    PyramidChartComponent,
    FrontDetailComponent,
    CheckoutComponent,
    CommandComponent,
    ////
    ChatComponent,
    MainComponent,
    UserComponent , 
    PlanificationMeetComponent,
    UserComponent , 
    PlanificationMeetComponent,
    RecStatsComponent,
    AddrecruitmentComponent,
    RecStatsComponent,
    RecruitmentchartsComponent,
    CandidatedisplayComponent,
    RecruitdisplayComponent,
    AddcandidateComponent,
    AssigcandidtorecComponent,
    CandidateinfoComponent,
    ExperiencematchingComponent,
    CandrecComponent,
    AvgsalaryComponent,
    OpbylocationComponent,
    ///////////////////////////DHOUHA Sprint2
    ConfirmationComponent,
    ProductionsComponent,
    BackendComponent,
    ProdDashComponent,
    StatsComponent,
    DefectsComponent,
    BubbleChartComponent,
    ProductionAddComponent,
    AddMvtComponent,
    MouvementStockComponent,
    StockDashComponent,
    BarcodeComponent,
    CheckoutNewComponent,


    
  ],
  imports: [
    AppRoutingModule,
    //LayoutsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    MatSnackBarModule,
    MatDialogModule,
    NgbModule,
    NgxQRCodeModule,
    BrowserModule,
    ContactModule, 
    TimestampToDatePipe,
    DeleteCustomerTrackingModule,
    DesaffceterUserModule, 
    AffecterPortfolioAConsultantModule,
    NgChartsModule,
    CrmDashboardModule ,
    BarcodesModule,
    DragDropModule,
    ReactiveFormsModule,
    //PlanifierReunionModule , 
    NgxChartsModule,
    ToastrModule.forRoot() // ToastrModule added here

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})

export class AppModule { }




