import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './main-view-model';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    
    if (!page.bindingContext) {
        page.bindingContext = new MainViewModel();
    }
}