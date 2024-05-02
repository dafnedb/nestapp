import { Controller, Get, Post, Query, Body, Res, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { PokemonService, Pokemon } from "../../../services/pokemon";

@Controller("pokemon")
export class PokemonController3 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getPokemonList(@Query("page") page: number = 1, @Res() res: Response) {
    try {
      const pokemonList = await this.pokemonService.getPokemonList(page);
      return res.status(HttpStatus.OK).json(pokemonList);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error fetching Pokemon" });
    }
  }

  @Post()
  async addPokemon(@Body() pokemon: Pokemon, @Res() res: Response) {
    try {
      const addedPokemon = await this.pokemonService.addPokemon(pokemon);
      return res.status(HttpStatus.CREATED).json(addedPokemon);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Error al agregarr Pokemon" });
    }
  }
}