DROP FUNCTION public.getaccountlistbyloginandcompanyid(character varying, bigint);

CREATE FUNCTION public.getaccountlistbyloginandcompanyid(
	"paramLogin" character varying,
	"paramCompanyId" bigint
	)

    RETURNS TABLE(
		"AccountId" bigint, 
		"CompanyId" bigint, 
		"Name" character varying, 
		"Type" bigint, 
		"Status" bigint, 
		"CreationDate" timestamp without time zone, 
		"UpdateDate" timestamp without time zone, 
		"DeletionDate" timestamp without time zone, 
		"CreationUserId" bigint, 
		"UpdateUserId" bigint, 
		"TaxId" character varying, 
		"AccountKey" character varying, 		 
		"Bank" character varying, 
		"BankBranch" character varying, 
		"BankAccount" character varying, 
		"BankAccountDigit" character varying, 
		"SPBBank" character varying, 
		"SPBBankBranch" character varying, 
		"SPBBankAccount" character varying, 
		"SPBBankAccountDigit" character varying,
		"IsFixedAccount" boolean
		) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$

SELECT 
			ACC."AccountId",
			ACC."CompanyId",
			ACC."Name",
			ACC."Type",
			ACC."Status",
			ACC."CreationDate",
			ACC."UpdateDate",
			ACC."DeletionDate",
			ACC."CreationUserId",
			ACC."UpdateUserId",
			ACC."TaxId",
			ACC."AccountKey",			
			SACC."Bank",
			SACC."BankBranch",
			SACC."BankAccount",
			SACC."BankAccountDigit",
			SPBACC."Bank" AS "SPBBank",
			SPBACC."BankBranch" AS "SPBBankBranch",
			SPBACC."BankAccount" AS "SPBBankAccount",
			SPBACC."BankAccountDigit" AS "SPBBankAccountDigit",
			UA."IsFixedAccount" AS "IsFixedAccount"
		FROM
			public."Account" AS ACC

		INNER JOIN "UserAccount" 
		AS UA 
		ON UA."AccountId" = Acc."AccountId"

		INNER JOIN "User" 
		AS U 
		ON U."UserId" = UA."UserId"

		LEFT JOIN "SubAccount" 
		AS SACC 
		ON SACC."AccountId" = ACC."AccountId"

		LEFT JOIN "SPBAccount" 
		AS SPBACC 
		ON SPBACC."AccountId" = ACC."AccountId"

	WHERE
		U."Login" = "paramLogin"
	AND 
		ACC."CompanyId" = "paramCompanyId"
	AND 
		UA."DeletionDate" IS NULL
	
	ORDER BY 
		UA."IsFixedAccount" DESC
$BODY$;

ALTER FUNCTION public.getaccountlistbyloginandcompanyid(character varying, bigint)
    OWNER TO "OSB";