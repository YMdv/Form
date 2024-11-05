import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration17307722161730772216966 implements MigrationInterface {
  name = 'Migration17307722161730772216966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`profile\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`cnpj\` varchar(255) NULL, \`cpf\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`cellPhone\` varchar(255) NOT NULL, \`telephone\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`zipCode\` varchar(255) NOT NULL, \`street\` varchar(255) NOT NULL, \`number\` varchar(255) NOT NULL, \`complement\` varchar(255) NULL, \`city\` varchar(255) NOT NULL, \`neighborhood\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`form\` (\`id\` varchar(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`active\` tinyint NOT NULL DEFAULT 1, \`type\` enum ('Individual', 'LegalPerson') NULL, \`acceptTerms\` tinyint NULL, \`profileId\` varchar(36) NULL, \`addressId\` varchar(36) NULL, UNIQUE INDEX \`REL_fc38875123fcf574d50e40ec55\` (\`profileId\`), UNIQUE INDEX \`REL_8fc78a8d10a3c19075dfea3604\` (\`addressId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`form\` ADD CONSTRAINT \`FK_fc38875123fcf574d50e40ec556\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`form\` ADD CONSTRAINT \`FK_8fc78a8d10a3c19075dfea3604c\` FOREIGN KEY (\`addressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`form\` DROP FOREIGN KEY \`FK_8fc78a8d10a3c19075dfea3604c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`form\` DROP FOREIGN KEY \`FK_fc38875123fcf574d50e40ec556\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_8fc78a8d10a3c19075dfea3604\` ON \`form\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_fc38875123fcf574d50e40ec55\` ON \`form\``,
    );
    await queryRunner.query(`DROP TABLE \`form\``);
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(`DROP TABLE \`profile\``);
  }
}
