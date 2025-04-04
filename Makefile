NODE_RUN=run
NPM_BIN=npm

# Instala las dependencias del proyecto
install:
	$(NPM_BIN) install

# Inicia el servidor
start:
	$(NODE_BIN) $(NODE_RUN) start

# Inicia el servidor en modo desarrollo
dev:
	$(NODE_BIN) $(NODE_RUN) dev
