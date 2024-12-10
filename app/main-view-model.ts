import { Observable } from '@nativescript/core';
import { PokemonService } from './services/pokemon.service';
import { NavigationService } from './services/navigation.service';

export class MainViewModel extends Observable {
    private pokemonService: PokemonService;
    private navigationService: NavigationService;
    private _pokemons: Array<any>;
    private _searchQuery: string;
    private _isLoading: boolean;

    constructor() {
        super();
        this.pokemonService = new PokemonService();
        this.navigationService = new NavigationService();
        this._searchQuery = '';
        this._isLoading = false;
        this._pokemons = [];
        this.loadRandomPokemons();
    }

    get pokemons(): Array<any> {
        return this._pokemons;
    }

    set pokemons(value: Array<any>) {
        if (this._pokemons !== value) {
            this._pokemons = value;
            this.notifyPropertyChange('pokemons', value);
        }
    }

    get searchQuery(): string {
        return this._searchQuery;
    }

    set searchQuery(value: string) {
        if (this._searchQuery !== value) {
            this._searchQuery = value;
            this.notifyPropertyChange('searchQuery', value);
        }
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    async loadRandomPokemons() {
        try {
            this.isLoading = true;
            const randomPokemons = await this.pokemonService.getRandomPokemons(50);
            this.pokemons = randomPokemons.filter(pokemon => pokemon !== null);
        } catch (error) {
            console.error('Error loading random pokemons:', error);
        } finally {
            this.isLoading = false;
        }
    }

    async onSearch() {
        if (!this.searchQuery.trim()) {
            return;
        }

        try {
            this.isLoading = true;
            const pokemon = await this.pokemonService.searchPokemon(this.searchQuery);
            if (pokemon) {
                this.navigationService.navigateToDetail(pokemon);
            }
        } catch (error) {
            alert({
                title: "Not Found",
                message: "Oops! This pokemon does not exist",
                okButtonText: "OK"
            });
        } finally {
            this.isLoading = false;
        }
    }

    onClear() {
        this.searchQuery = '';
        this.loadRandomPokemons();
    }

    onPokemonTap(args) {
        const pokemon = this.pokemons[args.index];
        this.navigationService.navigateToDetail(pokemon);
    }
}