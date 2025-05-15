import { ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import * as path from 'node:path'
import * as process from 'node:process'

import { isDev } from '@/src/shared/utils/is-dev.util'

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	return {
		playground: isDev(configService),
		path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
		autoSchemaFile: path.join(process.cwd(), 'src/core/graphql/schema.gql'),
		sortSchema: true,
		context: ({ req, res }) => ({ req, res })
	}
}
