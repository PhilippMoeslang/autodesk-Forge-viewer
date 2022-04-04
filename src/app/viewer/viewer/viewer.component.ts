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
export const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiU1N3eHdydDBidDNWNzNRT1pBN0VHb0EyQXlVYnpIN3MiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvYWp3dGV4cDYwIiwianRpIjoicFhQOWVKZGFFT2lCdXhGRUYyeW94ZTFkc3JFdHFOTElDRTc3bzJMNnFjaTdNZXR6ZWNNYXZuUzE0THppWHBnViIsImV4cCI6MTY0OTA1NzA3NX0.GeVVDPLk8zYFsvOSB7FYs6FeJFAY1_wW-KATLNBke7-NBccMiSNTpHozSQzZoDtiHgxkvUZzew2H3ZQit7sZEpuA8OSNt8yr_TR8vpdutB-uWXe6PtnkQbcaI1VFcmK7Cuiqqqm-plSuetJdEOm6OffLyfVoZaIvyHmGK3zcozbEJWy6cj4-d8YLm10YErRe55f1E5Q8FjzG82aCK6UbNXHAaIW_gB5EXI_uB6jT2K4s-CSpXi663xaI-WWRdc4jtayA4M5dKBfSEP2veST9FC7XDycz1qelru6Ulrv-96ffJcyJVYqQ-K5ZBkoDDgbiQ9YiSKuFwSWIM0GpCa3EpQ";
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
