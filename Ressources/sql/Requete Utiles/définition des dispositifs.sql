SELECT id_type, label_type as 'type',  re.label_role as 'equipier', nombre_min, nombre_max, rl.label_role as 'leader'
FROM `crfrdp`.`dispositif_type_definition` dtd, 
      `crfrdp`.`dispositif_type` dt,
      `crfrdp`.`equipier_role` re,
      `crfrdp`.`equipier_role` rl
WHERE dtd.id_dispositif_type = dt.id_type
AND  re.id_role = dtd.id_role
AND  rl.id_role = dt.id_role_leader;