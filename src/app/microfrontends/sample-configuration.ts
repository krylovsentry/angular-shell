      import {FederationPlugin} from './microfrontend.model';
      import {NavigationAlias} from './navigation.const';

      export const SAMPLE_CONFIGURATION: ReadonlyArray<FederationPlugin> = [
        {
          type: 'angular',
          subType: 'module',
          remoteEntry: 'https://angular-mfe-1.herokuapp.com/remoteEntry.js',
          remoteName: 'angular_mfe_1',
          exposedModule: 'MfeModule',
          displayName: 'Notes',
          routePath: 'notes',
          moduleName: 'BusinessModule',
          navigationAlias: 'notesList'
        },
        {
          type: 'react',
          remoteEntry: 'https://react-mfe-1.herokuapp.com/remoteEntry.js',
          remoteName: 'react_app',
          exposedModule: 'ReactApp',
          displayName: 'Notes admin panel',
          routePath: 'notesAdminPanel',
          navigationAlias: 'notesAdminPanel',
          moduleName: 'MainApplicationPlugin'
        },
        {
          type: 'vue',
          remoteEntry: 'http://localhost:3002/remoteEntry.js',
          remoteName: 'vue_app',
          exposedModule: './Button',
          displayName: 'Jira tickets',
          routePath: 'jira',
          navigationAlias: 'jira',
          moduleName: 'button'
        }
      ];

      export const NAVIGATION_ALIASES_MAP_TO_ROUTE_URL: Record<NavigationAlias, FederationPlugin['navigationAlias']> = {
        NOTES_ADMIN_PANEL: 'notesAdminPanel',
        NOTES_LIST: 'notesList'
      };

      export const ANGULAR_REMOTE_COMPONENTS_DESCRIPTOR: Record<string, FederationPlugin> = {
        notesCounter: {
          type: 'angular',
          subType: 'component',
          remoteEntry: 'https://angular-mfe-2.herokuapp.com/remoteEntry.js',
          remoteName: 'angular_mfe_2',
          exposedModule: 'NotesCounter',
          moduleName: 'NotesCounterComponent'
        }
      };
