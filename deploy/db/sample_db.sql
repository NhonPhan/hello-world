-- MySQL Script generated by MySQL Workbench
-- Thu Mar 21 10:31:09 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sample_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `sample_db` ;

-- -----------------------------------------------------
-- Schema sample_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sample_db` DEFAULT CHARACTER SET utf8 ;
USE `sample_db` ;

-- -----------------------------------------------------
-- Table `sample_db`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sample_db`.`role` ;

CREATE TABLE IF NOT EXISTS `sample_db`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sample_db`.`staff`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sample_db`.`staff` ;

CREATE TABLE IF NOT EXISTS `sample_db`.`staff` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `username` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `email` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `dob` DATE NULL,
  `address` VARCHAR(255) NULL,
  `phone` VARCHAR(45) NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_staff_role1_idx` (`role_id` ASC),
  CONSTRAINT `fk_staff_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `sample_db`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
