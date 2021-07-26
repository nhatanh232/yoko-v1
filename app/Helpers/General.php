<?php


namespace App\Helpers;


class General
{
    static function get_controller_action() {
        $action = app('request')->route()->getAction();

        $route = isset($action['as']) ? $action['as'] : '';

        $controller = class_basename($action['controller']);

        list($controller, $action) = explode('@', $controller);

        if (!$route) {
            $route = strtolower( str_replace('Controller', '', $controller) ) .'.'. $action;
        }

        return array(
            'controller' => $controller,
            'action' => $action,
            'as' => $route
        );
    }
}
