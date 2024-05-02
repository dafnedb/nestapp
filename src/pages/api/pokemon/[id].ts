import { Controller, Post, Param, Res, Redirect } from "@nestjs/common";
import { Response } from "express";
import { PokemonService } from "../../../services/pokemon";

@Controller("pokemon")
export class PokemonController2 {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post(":id")
  @Redirect("/") // Redireccionar a la página principal después de eliminar el Pokémon
  async deletePokemon(@Param("id") id: string) {
    const pokemonId = parseInt(id, 10);
    await this.pokemonService.deletePokemon(pokemonId);
  }
}