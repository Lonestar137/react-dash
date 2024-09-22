{ pkgs ? import <nixpkgs> {} }:

let
  nodejs = pkgs.nodejs-18_x;
  yarn = pkgs.yarn.override { inherit nodejs; };
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs
    yarn
    fish
    nodePackages.npm
  ];

  shellHook = ''
    export PATH="$PWD/node_modules/.bin:$PATH"

    exec /bin/fish
  '';

  REACT_APP_ENV = "development";
}

