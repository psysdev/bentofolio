#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init.js";

const program = new Command();

program
  .name("bentofolio")
  .description("Scaffold a bento-grid portfolio from a GitHub profile")
  .version("0.1.0");

program
  .command("init")
  .description("Create a new BentoFolio project")
  .argument("<project-directory>", "Directory name for the new project")
  .option("-g, --github <handle>", "GitHub username to import profile data from")
  .action(init);

program.parse();
