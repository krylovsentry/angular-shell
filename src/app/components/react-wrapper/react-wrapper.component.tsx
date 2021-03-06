    import {AfterContentInit, Component, ElementRef, Input} from '@angular/core';
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {ActivatedRoute, Data} from '@angular/router';
    import {take} from 'rxjs/operators';
    import {FederationPlugin} from '../../microfrontends/microfrontend.model';
    import {loadRemoteModule} from '../../utils/federation-utils';
    import {EventBusService} from '../../microfrontends/event-bus.service';
    import {GlobalNavigationService} from '../../microfrontends/global-navigation.service';


    @Component({
      selector: 'react-wrapper',
      template: '',
      styles: [':host {height: 100%; overflow: auto;}']
    })
    export class ReactWrapperComponent implements AfterContentInit {

      @Input() props: Record<string, any>;


      constructor(private hostRef: ElementRef,
                  private route: ActivatedRoute,
                  private eventBusService: EventBusService,
                  private globalNavigationService: GlobalNavigationService
      ) {
      }

      async ngAfterContentInit(): Promise<void> {
        this.route.data
          .pipe(take(1))
          .subscribe(async (data: Data) => {
            const configuration: FederationPlugin = data.configuration;
            const component = await loadRemoteModule({
              remoteEntry: configuration.remoteEntry,
              remoteName: configuration.remoteName,
              exposedModule: configuration.exposedModule
            });
            const ReactMFEModule = component[configuration.moduleName];
            const ReactElement = React.createElement(ReactMFEModule, this.constructProps(data.props));
            ReactDOM.render(ReactElement, this.hostRef.nativeElement);
          });
      }

      private constructProps(routeProps) {
        if (!routeProps) {
          routeProps = {};
        }
        if (!this.props) {
          this.props = {};
        }

        return {...this.props, ...routeProps, eventBus: this.eventBusService, globalNavigation: this.globalNavigationService};
      }
    }
