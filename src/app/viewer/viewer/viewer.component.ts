import { Component, Input } from "@angular/core";
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
//export const ACCESS_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IlU3c0dGRldUTzlBekNhSzBqZURRM2dQZXBURVdWN2VhIn0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIl0sImNsaWVudF9pZCI6IlNTd3h3cnQwYnQzVjczUU9aQTdFR29BMkF5VWJ6SDdzIiwiYXVkIjoiaHR0cHM6Ly9hdXRvZGVzay5jb20vYXVkL2Fqd3RleHA2MCIsImp0aSI6IlZlU1k5aEdEUUU3dWc4djk0eFlWcUNPeGhtN3N3Z0tyS2MydTQzYTJUNDhxUUhMYnpNaDVhSWhKaXZmQjFuRkQiLCJleHAiOjE2NDkxNDQ2MjJ9.QGZQzVI-rmUQZJLfj3vTtKJUsnKhXQGN-c5MjWc2eguAQvYJafDQNu0nLMHD9zpnigoqt7TtBk7LTkWqQ6PtPDNMDW0MSRwZYI4bQ7qiH3gKTdkd59DFhPVfq7iGczdX-jDOYo6XDNLAKzrvdCTe9YYWuvzxib4jUhQVL_jRIHzrW_Cll5IEB4MCCXrdo6kaiErZchnYKRyBb21xMhR31Ccl0t6h-qapDVDV371FeBlYfPrqbtCC4RuYv6eNjX8R8CfpeItmnqRVyAOsefhcGkMAqT8QhvVuyhwi982jTWb-vsT4q-Znz7i3_7oy3eRBBhjfh3NbmbQcB4BqX374Jg";
export const MODEL_URN = "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c3N3eHdydDBidDN2NzNxb3phN2Vnb2EyYXl1YnpoN3MtZW1lYWdlaWdlcmdydXBwZS9ib3guaXB0";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  name = "Angular Forge Viewer";

  public viewerOptions: ViewerOptions;

  public documentId: string;

  @Input() public accessToken: string;

  @Input() public modelUrn: string;

  public ACCESS_TOKEN: string;

  public MODEL_URN: string;

  public ngOnInit() {
    this.ACCESS_TOKEN = this.accessToken;
    this.MODEL_URN = this.modelUrn
    this.viewerOptions = {
      initializerOptions: {
        env: "AutodeskProduction",
        getAccessToken: (
          onGetAccessToken: (token: string, expire: number) => void
        ) => {
          const expireTimeSeconds = 60 * 30;
          onGetAccessToken(this.ACCESS_TOKEN, expireTimeSeconds);
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
        args.viewerComponent.DocumentId = MODEL_URN;//DOCUMENT_URN;
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
