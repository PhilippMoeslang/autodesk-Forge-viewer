import { Component } from "@angular/core";
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension
} from "ng2-adsk-forge-viewer";

import { MyExtension } from "src/app/my-extension";

// Insert a token and a document URN here
// Then refresh the app
export const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiU1N3eHdydDBidDNWNzNRT1pBN0VHb0EyQXlVYnpIN3MiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvYWp3dGV4cDYwIiwianRpIjoid0VURW9oY1ZEYWpjdmZYRW9jdWZGQ3BuUnd3VUhWdUc3VEFvelk0ZDhSU1RMbzkwY1FnWVA3T2dJR240aUUyaSIsImV4cCI6MTY0OTA4ODk0OH0.Dkge1AtsGoyp2HDSgDQJkzNM76v2tAcxJF_u2Bkx1ss6QCQrssenFQ8TYxinF_5DNpXlBlICuv02I0Qv5-QQ7ni6kGfFlU1xR-aUpyHwLIKKZ0dI8cS9hD8LvtkRnSfY-mCYQcBtHNoppPyRTpVSX4Hlu18OeOl12R_HF44Xu1lkYe72jijfWYk_5todnasdJfgInjAyTdng-5ICns9aAvIVpZ7JVfT1KC7fd7DbukQcz6yzG699RJMS5bUZ0DSKdgMFsjyl1WaRX8011TI0zThhOGxGKjIDfycyRY_tmXghDRtDhnOIL5D3IgR2upVvBW7xNAxDEGnA-8lDzOtoIg";
export const DOCUMENT_URN = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c3N3eHdydDBidDN2NzNxb3phN2Vnb2EyYXl1YnpoN3MtZW1lYWdlaWdlcmdydXBwZS8yMDIyMDMyMV9Cb2RlbnZpc3VhbGlzaWVydW5nX1Y1X0tXMDktMTJtaXRWb3JzY2hhdS5ydnQ";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {
  name = "Angular Forge Viewer";
  public viewerOptions: ViewerOptions;
  public documentId: string;

  public ngOnInit() {
    this.viewerOptions = {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(ACCESS_TOKEN, expireTimeSeconds);
        },
        api: "derivativeV2",
        enableMemoryManagement: true
      },
      viewerConfig: {
        extensions: ["Autodesk.DocumentBrowser", MyExtension.extensionName],
        theme: "bim-theme"
      },
      onViewerScriptsLoaded: () => {
        // Register a custom extension
        Extension.registerExtension(MyExtension.extensionName, MyExtension);
      },
      onViewerInitialized: (args: ViewerInitializedEvent) => {
        args.viewerComponent.DocumentId = DOCUMENT_URN;
      },
      // showFirstViewable: false,
      // headlessViewer: true,
      // Set specific version number
      //version: "7.41"
    };
  }

  public selectionChanged(event: SelectionChangedEventArgs) {
    console.log(event.dbIdArray);
  }
}
