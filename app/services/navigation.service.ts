import { Frame } from '@nativescript/core';

export class NavigationService {
  navigateToDetail(pokemon: any) {
    Frame.topmost().navigate({
      moduleName: 'components/pokemon-detail-page',
      context: { pokemon },
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
      },
    });
  }
}