CREATE OR REPLACE FUNCTION public.getinternaltransferbyexternalidentifier(
	"paramExternalIdentifier" bigint)
    RETURNS TABLE(
    "InternalTransferId" bigint, 
    "Identifier" character varying, 
    "FromAccountId" bigint, 
    "ToAccountId" bigint, 
    "TransferValue" numeric, 
    "TransferDate" timestamp without time zone, 
    "Status" integer,
    "ExternalIdentifier" bigint, 
    "Description" character varying, 
    "CreationDate" timestamp without time zone, 
    "UpdateDate" timestamp without time zone, 
    "DeletionDate" timestamp without time zone, 
    "CreationUserId" bigint, 
    "UpdateUserId" bigint, 
    "Attempts" integer, 
    "OperationId" bigint) 
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
SELECT "InternalTransferId",
		"Identifier",
        "FromAccountId",
        "ToAccountId",
        "TransferValue",
        "TransferDate",
        "Status",
        "ExternalIdentifier",
        "Description",
        "CreationDate",
        "UpdateDate",
        "DeletionDate",
        "CreationUserId",
        "UpdateUserId",
		"Attempts",
		"OperationId"
FROM public."InternalTransfer"
WHERE "ExternalIdentifier" = "paramExternalIdentifier" 
AND "DeletionDate" IS NULL;
$BODY$;

ALTER FUNCTION public.getinternaltransferbyexternalidentifier(bigint)
    OWNER TO "OSB";
