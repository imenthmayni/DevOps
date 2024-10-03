import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './layouts/front-layout/front-layout.component';
import { SigninComponent } from './authentication/component/signin/signin.component';
import { SignupComponent } from './authentication/component/signup/signup.component';
import { ProfileComponent } from './authentication/component/profile/profile.component';
import { UpdateComponent } from './authentication/component/update/update.component';
import { EditleavComponent } from './views/admin/editleav/editleav.component';
import { LeavdisplayComponent } from './views/admin/leavdisplay/leavdisplay.component';
import { LeavcalendarComponent } from './views/admin/leavcalendar/leavcalendar.component';
import { LecalendarComponent } from './views/front/lecalendar/lecalendar.component';
import { AddrecrequestComponent } from './views/front/addrecrequest/addrecrequest.component';
import { RatingComponent } from './views/front/rating/rating.component';
import { ReccalendarComponent } from './views/front/reccalendar/reccalendar.component';
import { LeaveViewComponent } from './views/admin/leave-view/leave-view.component';
import { LeavdashboardComponent } from './views/admin/leavdashboard/leavdashboard.component';
import { RecinfoComponent } from './views/front/recinfo/recinfo.component';
import { RecruitmentformComponent } from './views/front/recruitmentform/recruitmentform.component';
import { DeleteComponentComponent } from './views/admin/delete-consultant/delete-component/delete-component.component';
import { RetrieveAllConsultantComponent } from './views/admin/retriev-all-consultant/retrieve-all-consultant/retrieve-all-consultant.component';
import { RetrieveConsultantComponent } from './views/admin/retrieve-consultant/retrieve-consultant/retrieve-consultant.component';
import { DeletePortfolioComponent } from './views/admin/delete-portfolio/delete-portfolio/delete-portfolio.component';
import { CustomerTrackingComponent } from './views/admin/retrieve-aall-customer-tracking/customer-tracking/customer-tracking.component';
import { AddCustomerTrackingComponent } from './views/admin/add-customer-tracking/add-customer-tracking/add-customer-tracking.component';
import { DeleteCustomerTrackingComponent } from './views/admin/delete-customer-tracking/delete-customer-tracking/delete-customer-tracking.component';
import { AffecterUserPortfolioComponent } from './views/admin/affecter-user-portfilio/affecter-user-portfolio/affecter-user-portfolio.component';
import { AffecterPortfolioAConsultantComponent } from './views/admin/affecter-portfolio-aconsultant/affecter-portfolio-aconsultant/affecter-portfolio-aconsultant.component';
import { AfficherConsultantsComponent } from './views/front/afficher-consultants/afficher-consultants/afficher-consultants.component';
import { StatistiquePortfolioComponent } from './views/admin/statisque-portfolio/statistique-portfolio/statistique-portfolio.component';
import { DesaffecterUserComponent } from './views/admin/desaffceter-user/desaffecter-user/desaffecter-user.component';
import { UpdateConsultantComponent } from './views/admin/update-consultant/update-consultant/update-consultant.component';
import { PlanifierReunionComponent } from './views/admin/planifier-reunion/planifier-reunion/planifier-reunion.component';
import { ProjectComponent } from './views/admin/project/project/project.component';
import { DetailleprojectComponent } from './views/admin/project/detailleproject/detailleproject.component';
import { DetailletaskComponent } from './views/admin/task/detailletask/detailletask.component';
import { UpdatetaskComponent } from './views/admin/updatetask/updatetask/updatetask.component';
import { AfficheprojectComponent } from './views/admin/project/afficheproject/afficheproject.component';

import { CommandComponent } from './Components/command/command.component';
import { PyramidChartComponent } from './Components/pyramid-chart/pyramid-chart.component';
import { DetailsComponent } from './Components/details/details.component';
import { ProductEditComponentComponent } from './Components/product-edit-component/product-edit-component.component';
import { ProductListComponent } from './Components/list-product/product-list/product-list.component';
import { AddProductComponent } from './Components/add-product/add-product/add-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { FrontDetailComponent } from './Components/front-detail/front-detail.component';
import { PdfGeneratorComponent } from './Components/pdf-generator/pdf-generator.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { FrontProductComponent } from './Components/FrontOfficeComponent/front-product/front-product.component';
import { CrmDashboardComponent } from './views/admin/crm-dashboard/crm-dashboard/crm-dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { MainComponent } from './mainChat/main.component';
import { UserComponent } from './user/user.component';
import { PlanificationMeetComponent } from './views/front/planification-meet/planification-meet/planification-meet.component';

import { ProjectdashboardComponent } from './views/admin/project/projectdashboard/projectdashboard.component';
import { AddresourceComponent } from './views/admin/resource/addresource/addresource.component';
import { ContactComponent } from './views/front/contact/contact/contact.component';
import { NoteComponent } from './views/admin/note/note/note.component';
import { ProjressourceComponent } from './views/admin/project/projressource/projressource.component';
import { AddrecruitmentComponent } from './views/admin/addrecruitment/addrecruitment.component';
import { FileUploadComponent } from './views/front/file-upload/file-upload.component';
import { RecruitmentchartsComponent } from './views/front/recruitmentcharts/recruitmentcharts.component';
import { AddcandidateComponent } from './views/admin/addcandidate/addcandidate.component';
import { CandidatedisplayComponent } from './views/admin/candidatedisplay/candidatedisplay.component';
import { AssigcandidtorecComponent } from './views/admin/assigcandidtorec/assigcandidtorec.component';
import { CandidateinfoComponent } from './views/admin/candidateinfo/candidateinfo.component';
import { ExperiencematchingComponent } from './views/admin/experiencematching/experiencematching.component';
import { RecruitdisplayComponent } from './views/admin/recruitdisplay/recruitdisplay.component';
import { AvgsalaryComponent } from './views/front/avgsalary/avgsalary.component';
import { OpbylocationComponent } from './views/front/opbylocation/opbylocation.component';
import { RecStatsComponent } from './views/front/rec-stats/rec-stats.component';

import { AddBudgetComponent } from './views/admin/budgett/add-budget/add-budget.component';

import { ProductionsComponent } from './Components/productions/productions.component';
import { ProdDashComponent } from './Components/prod-dash/prod-dash.component';
import { StatsComponent } from './Components/stats/stats.component';
import { DefectsComponent } from './Components/defects/defects.component';
import { BubbleChartComponent } from './Components/bubble-chart/bubble-chart.component';
import { ProductionAddComponent } from './Components/production-add/production-add.component';
import { AddMvtComponent } from './Components/add-mvt/add-mvt.component';
import { MouvementStockComponent } from './Components/mouvement-stock/mouvement-stock.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { BarcodeComponent } from './Components/barcode/barcode.component';
import { CheckoutNewComponent } from './Components/checkout-new/checkout-new.component';
import { StockDashComponent } from './Components/stock-dash/stock-dash.component';
import { ForgotPasswordComponent } from './views/admin/auth/auth/forgot-password/forgot-password.component';
import { ChangePWDComponent } from './views/admin/auth/auth/change-pwd/change-pwd.component';




const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'user', component: UserComponent },
  { path: 'forgotpwd', component: ForgotPasswordComponent },
  { path: 'changepwd', component: ChangePWDComponent },

  {

    path: 'admin', component: AdminLayoutComponent, children: [
      { path: '', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'prime', loadChildren: () => import('./views/admin/prime/prime.module').then(m => m.PrimeModule) },
      { path: 'contribution', loadChildren: () => import('./views/admin/contribution/contribution.module').then(m => m.ContributionModule) },
      { path: 'dashboard', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'auth', loadChildren: () => import('./views/admin/auth/auth.module').then(m => m.AuthModule) },
      { path: 'prime', loadChildren: () => import('./views/admin/prime/prime.module').then(m => m.PrimeModule) },
      { path: 'contribution', loadChildren: () => import('./views/admin/contribution/contribution.module').then(m => m.ContributionModule) },
      { path: 'ajout', loadChildren: () => import('./views/admin/work/work.module').then(m => m.WorkModule) },
      {
        path: 'leavdisplay',
        component: LeavdisplayComponent,
        children: [
          { path: 'update', component: EditleavComponent }
        ]
      },
      { path: 'ajoutRec', component:AddrecruitmentComponent},
      { path: 'calendar', component: LeavcalendarComponent },
      { path: 'view', component: LeaveViewComponent },
      { path: 'fileUploader', component: FileUploadComponent},
      { path:'addCandid',component: AddcandidateComponent},
      { path:'candisplay',component:CandidatedisplayComponent},
      { path: 'candidateinfo/:idCandidate', component: CandidateinfoComponent},
      { path: 'assigncandrec', component:AssigcandidtorecComponent},
      { path: 'pourcentage', component: ExperiencematchingComponent},
      { path: 'recruitdisplay', component:RecruitdisplayComponent},


      { path: 'stat', component: LeavdashboardComponent },
      { path: "retrievAllConsultant", loadChildren: () => import('./views/admin/retriev-all-consultant/retriev-all-consultant.module').then(m => m.RetrievAllConsultantModule) },
      { path: "portfolio", loadChildren: () => import('./views/admin/portfolio/portfolio.module').then(m => m.PortfolioModule) },
      { path: "addConsultant", loadChildren: () => import('./views/admin/add-consultant/add-consultant.module').then(m => m.AddConsultantModule) },
      { path: "updateConsultant/:id", loadChildren: () => import('./views/admin/update-consultant/update-consultant.module').then(m => m.UpdateConsultantModule) },
      { path: "deleteConsultant", loadChildren: () => import('./views/admin/delete-consultant/delete-consultant.module').then(m => m.DeleteConsultantModule) },
      { path: "addPortfolio", loadChildren: () => import('./views/admin/add-portfolio/add-portfolio.module').then(m => m.AddPortfolioModule) },
      { path: 'retrieveConsultant', component: RetrieveAllConsultantComponent },
      { path: 'deleteCustomerTracking', loadChildren: () => import('./views/admin/delete-customer-tracking/delete-customer-tracking.module').then(m => m.DeleteCustomerTrackingModule) },
      { path: 'removeConsultant', component: DeleteComponentComponent },
      { path: 'deletePortfolio/:id', component: DeletePortfolioComponent },
      { path: 'retrieveAllCustomerTracking', component: CustomerTrackingComponent },
      { path: 'addCustomerTracking', component: AddCustomerTrackingComponent },
      { path: ' DeleteCustomerTracking/:id', component: DeleteCustomerTrackingComponent },
      { path: 'affecterUserPortfolio/:id', component: AffecterUserPortfolioComponent },
      { path: 'affecterConsultantAPortfolio/:id', component: AffecterPortfolioAConsultantComponent },
      { path: 'statistiquePortfolio/:id', component: StatistiquePortfolioComponent },
      { path: 'desaffecterUser/:portfolioId', component: DesaffecterUserComponent },
      { path: 'updateConsultant/:consultant_id', component: UpdateConsultantComponent },
      { path: 'planifierReunion/:id', component: PlanifierReunionComponent },
      { path: 'Project', loadChildren: () => import('./views/admin/project/project.module').then(m => m.ProjectModule) },
      { path: 'add-project', loadChildren: () => import('./views/admin/add-project/add-project.module').then(m => m.AddProjectModule) },
      { path: 'update-project/:id', loadChildren: () => import('./views/admin/update-project/update-project.module').then(m => m.UpdateProjectModule) },
      { path: 'task', loadChildren: () => import('./views/admin/task/task.module').then(m => m.TaskModule) },
      { path: 'taskAdd', loadChildren: () => import('./views/admin/task-add/task-add.module').then(m => m.TaskAddModule) },
      { path: 'updatetask/:id', loadChildren: () => import('./views/admin/updatetask/updatetask.module').then(m => m.UpdatetaskModule) },
      { path: 'budgett', loadChildren: () => import('./views/admin/budgett/budgett.module').then(m => m.BudgettModule), },
      { path: 'projects', component: ProjectComponent },
      { path: 'projects/detail/:id', component: DetailleprojectComponent },
      { path: 'Task/detailletask/:id', component: DetailletaskComponent },
      { path: 'addBudget', component: AddBudgetComponent },

      { path: 'afficheProject', component: AfficheprojectComponent },
      //sprint1 DHOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUHA
      { path: 'add-product', component: AddProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-edit/:id', component: ProductEditComponentComponent },
      { path: 'product-details/:id', component: DetailsComponent },
      { path: 'chart', component: PieChartComponent },
      { path: 'pyramid', component: PyramidChartComponent},
      { path: 'command', component: CommandComponent},
      //sprint2 
      { path: 'prod', component: ProductionsComponent},
      { path: 'prodDash/:id', component: ProdDashComponent},
      { path: 'stats', component: StatsComponent},
      { path: 'bubble', component: BubbleChartComponent},
      { path: 'ajout-production', component: ProductionAddComponent},
      { path: 'add-mvt', component: AddMvtComponent},
      { path: 'list-mvt', component: MouvementStockComponent},
      { path: 'stock-dash', component: StockDashComponent},

      { path: 'projectdashboard', component: ProjectdashboardComponent },
      { path: 'afficheProject', component: AfficheprojectComponent },
      { path: 'resources', loadChildren: () => import('./views/admin/resource/resource.module').then(m => m.ResourceModule) },
      { path: 'addresource', component: AddresourceComponent },
      { path: 'Perfermance', component: NoteComponent },
      { path: 'projects/projressource/:id', component: ProjressourceComponent },
      {path: 'ajouterRec',component: AddrecruitmentComponent},

      //{path:'CRM',loadChildren:()=>import('./views/admin/crm/crm.module').then(m=>m.CRMModule)}


      {path:'CRM',loadChildren:()=>import('./views/admin/crm/crm.module').then(m=>m.CRMModule)} ,
      {path:'crmDashboard', component:CrmDashboardComponent}
    ]

  },

  {
    path: '', component: FrontLayoutComponent, children: [
      { path: ' ', loadChildren: () => import('./views/front/client/client.module').then(m => m.ClientModule) },
      { path: 'payroll', loadChildren: () => import('./views/front/payroll/payroll.module').then(m => m.PayrollModule) },
      { path: 'calend', component: LecalendarComponent },
      { path: 'ajoutrec', component: AddrecrequestComponent },
      { path: 'rate', component: RatingComponent },
      { path: 'reccalend', component: ReccalendarComponent },
      { path: 'rinfo', component: RecinfoComponent },
      { path: 'recform', component: RecruitmentformComponent },
      {path: 'statj', component: RecruitmentchartsComponent},
      {path: 'avgsalary', component: AvgsalaryComponent},
      {path: 'oplocation', component: OpbylocationComponent},
      {path: 'recstatss', component: RecStatsComponent},



      { path: 'consultant', component: AfficherConsultantsComponent} ,
      
      // DHOUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUHA
      { path: 'front-product', component: FrontProductComponent },
      { path: 'cart', component: CartComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'detail/:id', component: FrontDetailComponent },
      { path: 'facture', component: PdfGeneratorComponent},
      { path: 'checkout', component: CheckoutComponent},
      // Sprint2
      { path: 'confirmation', component: ConfirmationComponent},
      

      { path: '', loadChildren: () => import('./views/front/client/client.module').then(m => m.ClientModule) },
      { path: 'Projects', loadChildren: () => import('./views/front/client/projects/projects.module').then(m => m.ProjectsModule) },
      { path: 'Project', loadChildren: () => import('./views/front/client/projectfront/projectfront.module').then(m => m.ProjectfrontModule) },
      { path: 'contact', component: ContactComponent },
{path:'afficherConsultant', component:AfficherConsultantsComponent},
      { path: 'planificationMeet/:id',component: PlanificationMeetComponent} ,


    ]
  },

  { path: 'bar', component: BarcodeComponent},
  { path: 'new', component: CheckoutNewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
