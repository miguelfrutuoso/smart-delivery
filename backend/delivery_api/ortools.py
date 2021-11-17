from ortools.constraint_solver import routing_enums_pb2
from ortools.constraint_solver import pywrapcp
import requests
import sys
import random
import math

class Location:
    def __init__(self, longitude, latitude, timing):
        self.longitude = longitude
        self.latitude = latitude
        self.timing = timing

class Timing:
    def __init__(self, start, end):
        self.start = start
        self.end = end

def solve(data):
    """Solve the VRP with time windows."""
    # Instantiate the data problem. OK
    #data = create_data_model()

    # Create the routing index manager. OK+/-
    manager = pywrapcp.RoutingIndexManager(
        len(data['time_matrix']), data['num_vehicles'], data['depot'])

    # Create Routing Model.
    routing = pywrapcp.RoutingModel(manager)

    # Create and register a transit callback.

    def time_callback(from_index, to_index):
        """Returns the travel time between the two nodes."""
        # Convert from routing variable Index to time matrix NodeIndex.
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)
        return data['time_matrix'][from_node][to_node]

    transit_callback_index = routing.RegisterTransitCallback(time_callback)

    # Define cost of each arc.
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)

    # Add Time Windows constraint.
    time = 'Time'
    routing.AddDimension(
        transit_callback_index,
        310,  # allow waiting time
        10000,  # maximum time per vehicle
        False,  # Don't force start cumul to zero.
        time)
    time_dimension = routing.GetDimensionOrDie(time)
    # Add time window constraints for each location except depot.
    for location_idx, time_window in enumerate(data['time_windows']):
        if location_idx == data['depot']:
            continue
        index = manager.NodeToIndex(location_idx)
        print("time_window", time_window[0])
        time_dimension.CumulVar(index).SetMin(time_window[0])
        time_dimension.CumulVar(index).SetMax(time_window[1])
        #time_dimension.CumulVar(index).SetRange(time_window[0], time_window[1])
    # Add time window constraints for each vehicle start node.
    depot_idx = data['depot']
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        time_dimension.CumulVar(index).SetRange(data['time_windows'][depot_idx][0], data['time_windows'][depot_idx][1])

    # Instantiate route start and end times to produce feasible times.
    for i in range(data['num_vehicles']):
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.Start(i)))
        routing.AddVariableMinimizedByFinalizer(
            time_dimension.CumulVar(routing.End(i)))

    # Setting first solution heuristic.
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    search_parameters.time_limit.seconds = 1000

    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC)

    # Solve the problem.
    solution = routing.SolveWithParameters(search_parameters)
    # Print solution on console.
    if solution:
        print("Solucao", print_solution2(data, manager, routing, solution))
        return print_solution2(data, manager, routing, solution)
    else:
        print(routing.status())

def get_time_matrix(locations):
    """
    Returns a matrix with travel times between the given locations
    """
    request_string = build_request_string(locations) 
    response = requests.get(request_string)
    response = response.json()
    #response = {'code': 'Ok', 'durations': [[0.0, 117.7, 189.1, 20.0, 3055.0, 3068.5, 400.1, 137.9, 192.2], [117.7, 0.0, 71.4, 97.7, 3172.7, 3186.2, 282.4, 20.2, 74.5], [189.1, 71.4, 0.0, 169.1, 3244.1, 3257.6, 211.0, 51.2, 3.1], [20.0, 97.7, 169.1, 0.0, 3075.0, 3088.5, 380.1, 117.9, 172.2], [3051.0, 3168.7, 3240.1, 3071.0, 0.0, 13.5, 3451.1, 3188.9, 3243.2], [3064.5, 3182.2, 3253.6, 3084.5, 13.5, 0.0, 3464.6, 3202.4, 3256.7], [400.1, 282.4, 211.0, 380.1, 3455.1, 3468.6, 0.0, 262.2, 207.9], [137.9, 20.2, 51.2, 117.9, 3192.9, 3206.4, 262.2, 0.0, 54.3], [192.2, 74.5, 3.1, 172.2, 3247.2, 3260.7, 207.9, 54.3, 0.0]], 'destinations': [{'distance': 29.621416122, 'name': '', 'location': [39.290993, -7.434512]}, {'distance': 37.088965012, 'name': '', 'location': [39.292153, -7.431918]}, {'distance': 276.00366045, 'name': '', 'location': [39.292469, -7.430168]}, {'distance': 461.867488997, 'name': '', 'location': [39.291138, -7.434035]}, {'distance': 292.553633949, 'name': '', 'location': [39.280426, -7.424846]}, {'distance': 430.247996107, 'name': '', 'location': [39.281058, -7.424927]}, {'distance': 161.331688985, 'name': '', 'location': [39.293028, -7.424961]}, {'distance': 600.021574263, 'name': '', 'location': [39.292279, -7.431431]}, {'distance': 931.316213815, 'name': '', 'location': [39.292476, -7.430091]}], 'sources': [{'distance': 29.621416122, 'name': '', 'location': [39.290993, -7.434512]}, {'distance': 37.088965012, 'name': '', 'location': [39.292153, -7.431918]}, {'distance': 276.00366045, 'name': '', 'location': [39.292469, -7.430168]}, {'distance': 461.867488997, 'name': '', 'location': [39.291138, -7.434035]}, {'distance': 292.553633949, 'name': '', 'location': [39.280426, -7.424846]}, {'distance': 430.247996107, 'name': '', 'location': [39.281058, -7.424927]}, {'distance': 161.331688985, 'name': '', 'location': [39.293028, -7.424961]}, {'distance': 600.021574263, 'name': '', 'location': [39.292279, -7.431431]}, {'distance': 931.316213815, 'name': '', 'location': [39.292476, -7.430091]}]}
    response = response['durations']
    response = time_matrix_sec_to_hour(response)

    return response

def print_solution(data, manager, routing, solution):
    """Prints solution on console."""
    print(f'Objective: {solution.ObjectiveValue()}')
    time_dimension = routing.GetDimensionOrDie('Time')
    total_time = 0
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        while not routing.IsEnd(index):
            time_var = time_dimension.CumulVar(index)
            plan_output += '{0} Time({1},{2}) -> '.format(manager.IndexToNode(index), solution.Min(time_var), solution.Max(time_var))
            index = solution.Value(routing.NextVar(index))
        time_var = time_dimension.CumulVar(index)
        plan_output += '{0} Time({1},{2})\n'.format(manager.IndexToNode(index), solution.Min(time_var), solution.Max(time_var))
        plan_output += 'Time of the route: {}min\n'.format(solution.Min(time_var))
        print(plan_output)
        total_time += solution.Min(time_var)
    print('Total time of all routes: {}min'.format(total_time))

def print_solution2(data, manager, routing, solution):
    time_dimension = routing.GetDimensionOrDie('Time')
    total_time = 0
    result = {}
    result['route'] = []
    for vehicle_id in range(data['num_vehicles']):
        index = routing.Start(vehicle_id)
        plan_output = 'Route for vehicle {}:\n'.format(vehicle_id)
        while not routing.IsEnd(index):
            time_var = time_dimension.CumulVar(index)
            plan_output += '{0} Time({1},{2}) -> '.format(manager.IndexToNode(index), solution.Min(time_var), solution.Max(time_var))
            result['route'].append(manager.IndexToNode(index))
            index = solution.Value(routing.NextVar(index))
        time_var = time_dimension.CumulVar(index)

        total_time += solution.Min(time_var)

    

    result['total_time'] = total_time
    return result
        

def build_request_string(locations):
    '''
        builds a request with the given locations
    '''

    request_string = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving/'
    
    for location in locations:
        request_string += str(location['longitude']) + \
            ',' + str(location['latitude'])
        if location == locations[-1]:
            request_string += '?access_token=pk.eyJ1IjoibWlndWVsZnJ1dHVvc28iLCJhIjoiY2txdjljYWVpMDllNzJ6cDYzazg2dmhoZiJ9.2wSd1RH1bT_aKfCZaAdtVg'
        else:
            request_string += ';'

    return request_string


def time_matrix_sec_to_hour(time_matrix):
    '''
    Converts a time matrix in seconds to hours 
    '''
    for i in range(len(time_matrix)):
        for j in range(len(time_matrix[i])):
            time_matrix[i][j] = time_matrix[i][j] / 3600

    return time_matrix

def vrptw(combinations, start_time, starting_point):
    '''
    Calculates the best route based on a set of combinations
    start_time - minutes
    '''
    best_combination = None
    best_solution = {}
    best_solution['total_time'] = sys.maxsize
    best_solution['route'] = []
    
    for combination in combinations:

        data = {}

        combination = (starting_point,) + combination

        data['time_matrix'] = get_time_matrix(combination)
        
        data['time_windows'] = [(0, 60)]
        for location in combination[1:]: # skip depot
            data['time_windows'].append(shift_timeinterval(location['timeinterval'], start_time))

        data['num_vehicles'] = 1
        data['depot'] = 0   

        solution = solve(data)

        if solution['total_time'] < best_solution['total_time']:
            best_solution = solution
            best_solution['route'] = order_combination(combination, solution['route'])
            best_solution['total_time'] = solution['total_time']

        print(best_solution)
        break

        

    return best_solution

def vrptw_optimized(array, start_time):
    ''' 
        Calculates the best route given a list of orders with 1 or more delivery options (OTL)
        Simulated annealing will try to find the best combination of OTL
    '''

    
    temperature = 40
    final_temperature = .1
    alpha = 0.5
    current_state, current_state_idx = rand_pick_2d_array(array) # Set random initial state & current_state_idx is an array of selected indexes of the array
    current_state_cost = formulate_problem(current_state) # cost of current state

    while(1):

        #next_state = rand_pick_2d_array(array) # Pick a random next state 

        next_state = pick_neighbor(array, current_state_idx) # Pick a neighbor
        next_state_cost = formulate_problem(next_state) # Cost of next state

        cost_diff = next_state_cost - current_state_cost # Cost difference between next and current state

        if cost_diff > 0: # If next_state has less cost than current_state accept it
            current_state = next_state
        else: # If not accept it with a given probability
            if random.uniform(0, 1) < math.exp(-cost_diff /temperature):
                current_state = next_state

        temperature -= alpha # cool down

        if temperature <= final_temperature: # final temperature
            return current

        current = rand_pick_2d_array(array) # select random successor
    

def pick_neighbor(array, idx_array): # Pick a neighbor 

    neighbor = []

    change_id = random.uniform(0, len(array) - 1) # choice random element to change 

    while (len(array[change_id]) == 1): # if the element has 1 of length repeat random choice
        change_id = random.uniform(0, len(array) - 1)

    for i, idx in array:
        if idx == change_id: 
            element = random.uniform(0, len(i))
            idx_array[idx] = element # change idx array 
            neighbor.append(i[element]) # change random element
        else:
            neighbor.append(i[idx_array[idx]])

    return neighbor, idx_array

def formulate_problem(combination, start_time): 
    '''
        formulate a VRPTW problem
    '''
    data = {}

    data['time_matrix'] = get_time_matrix(combination)    
    data['time_windows'] = [(0, 60)]

    for location in combination:
        data['time_windows'].append(shift_timeinterval(location['timeinterval'], start_time))

    return solve(data)


def rand_pick_2d_array(array):
    '''
        Returns a 1D array with positions picked reandomly from the given array 
        and an array with the positions that were picked - idx_array
    '''

    rand_array = [];
    idx_array = [];

    for i in array:
        pick = random.randint(0, len(i) - 1) 
        rand_array.append(i[pick])
        idx_array.append(pick)
    
    return rand_array, idx_array

def shift_timeinterval(time_interval, start_time):
    return (time_interval[0] - start_time, time_interval[1] - start_time)

def order_combination(orders, solution):
    """
        Returns a list of orders ordered by positions given on solution
    """
    ordered_combination = []
    for pos in solution:
        print(pos)
        ordered_combination.append(orders[pos])

    return ordered_combination
